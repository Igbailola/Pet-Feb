import Foundation
import Vision
import AppKit

let arguments = CommandLine.arguments
guard arguments.count > 2 else {
    print("Usage: extract_all_ocr <image_path> <output_json_path>")
    exit(1)
}

let imagePath = arguments[1]
let outputPath = arguments[2]
let url = URL(fileURLWithPath: imagePath)

guard let image = NSImage(contentsOf: url),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image: \(imagePath)")
    exit(1)
}

struct TextItem: Codable {
    let text: String
    let x: Double
    let y: Double
    let width: Double
    let height: Double
}

var results: [TextItem] = []

let request = VNRecognizeTextRequest { request, error in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    for obs in observations {
        if let topCandidate = obs.topCandidates(1).first {
            let bbox = obs.boundingBox
            // Vision bbox has origin at bottom-left (0,0) and top-right (1,1).
            // Convert to top-left origin for intuitive reading
            let item = TextItem(
                text: topCandidate.string,
                x: bbox.origin.x,
                y: 1.0 - (bbox.origin.y + bbox.size.height),
                width: bbox.size.width,
                height: bbox.size.height
            )
            results.append(item)
        }
    }
}
request.recognitionLevel = .accurate

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try? handler.perform([request])

// Sort by Y (top to bottom), then X (left to right)
results.sort {
    if abs($0.y - $1.y) < 0.005 {
        return $0.x < $1.x
    }
    return $0.y < $1.y
}

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
if let data = try? encoder.encode(results) {
    try? data.write(to: URL(fileURLWithPath: outputPath))
    print("Successfully wrote \(results.count) text items to \(outputPath)")
}
