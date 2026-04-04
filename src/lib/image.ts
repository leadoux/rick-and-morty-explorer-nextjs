const FALLBACK_IMAGE = "/file.svg";

export function resolveImageUrl(value?: string | null) {
  if (!value) {
    return FALLBACK_IMAGE;
  }

  return value;
}
