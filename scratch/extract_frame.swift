import Foundation
import AVFoundation
import AppKit

let videoPath = "public/videos/HERO VIDEO.MOV"
let videoURL = URL(fileURLWithPath: videoPath)
let asset = AVAsset(url: videoURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true

let time = CMTime(seconds: 0.5, preferredTimescale: 600)
do {
    let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
    let bitmapRep = NSBitmapImageRep(cgImage: cgImage)
    let jpegData = bitmapRep.representation(using: .jpeg, properties: [:])
    try jpegData?.write(to: URL(fileURLWithPath: "public/hero-poster.jpg"))
    print("Successfully extracted hero poster frame to public/hero-poster.jpg")
} catch {
    print("Error extracting frame: \(error)")
}
