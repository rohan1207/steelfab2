const START_FRAME = 1;
const END_FRAME = 97;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

const EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

let detectedExt = null;
let preloadPromise = null;

function padFrame(frame) {
  return String(frame).padStart(3, "0");
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function detectExtension() {
  if (detectedExt) return detectedExt;

  const frameStr = padFrame(START_FRAME);
  for (const ext of EXTENSIONS) {
    const src = `/sequence/ezgif-frame-${frameStr}.${ext}`;
    try {
      await loadImage(src);
      detectedExt = ext;
      return detectedExt;
    } catch {
      // try next
    }
  }

  detectedExt = null;
  return null;
}

export async function preloadDecoreSequence() {
  if (preloadPromise) return preloadPromise;

  preloadPromise = (async () => {
    const ext = await detectExtension();
    if (!ext) return;

    const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => START_FRAME + i);
    const CONCURRENCY = 8;

    let cursor = 0;
    const worker = async () => {
      while (cursor < frames.length) {
        const sequenceFrame = frames[cursor];
        cursor += 1;
        const frameStr = padFrame(sequenceFrame);
        const src = `/sequence/ezgif-frame-${frameStr}.${ext}`;
        try {
          // Load into browser cache. We don't need the pixel data here.
          await loadImage(src);
        } catch {
          // Ignore missing/corrupt frames.
        }
      }
    };

    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  })();

  return preloadPromise;
}

