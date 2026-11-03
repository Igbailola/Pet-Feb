import Foundation
import Vision
import AppKit

guard CommandLine.arguments.count > 1 else {
    print("Usage: test_ocr <image_path>")
    exit(1)
}

let imagePath = CommandLine.arguments[1]
let url = URL(fileURLWithPath: imagePath)

guard let image = NSImage(contentsOf: url),
      let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to load image: \(imagePath)")
    exit(1)
}

let request = VNRecognizeTextRequest { request, error in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    for obs in observations {
        if let topCandidate = obs.topCandidates(1).first {
            let bbox = obs.boundingBox
            print("[\(String(format: "%.3f", bbox.origin.x)), \(String(format: "%.3f", bbox.origin.y)), \(String(format: "%.3f", bbox.size.width)), \(String(format: "%.3f", bbox.size.height))] \(topCandidate.string)")
        }
    }
}
request.recognitionLevel = .accurate

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try? handler.perform([request])
