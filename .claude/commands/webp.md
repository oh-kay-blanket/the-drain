# Convert PNG images to WebP format

This command will:
1. Find all .png files in the img/projects/tall folder
2. Convert each PNG to WebP format with compression
3. Display the results

Check if the directory exists and find PNG files:

```bash
if [ -d "img/projects/tall" ]; then
  echo "Found img/projects/tall directory"
  find img/projects/tall -name "*.png" -type f
else
  echo "❌ Directory img/projects/tall does not exist"
  exit 1
fi
```

Convert PNG files to WebP (requires cwebp tool):

```bash
if command -v cwebp &> /dev/null; then
  for png in img/projects/tall/*.png; do
    if [ -f "$png" ]; then
      webp="${png%.png}.webp"
      echo "Converting: $png -> $webp"
      cwebp -q 80 "$png" -o "$webp"
      if [ $? -eq 0 ]; then
        echo "✅ Successfully converted: $webp"
      else
        echo "❌ Failed to convert: $png"
      fi
    fi
  done
  echo "✅ Conversion complete!"
else
  echo "❌ cwebp not found. Install it with:"
  echo "   macOS: brew install webp"
  echo "   Linux: sudo apt-get install webp"
  exit 1
fi
```

Show the results:

```bash
echo ""
echo "PNG files:"
ls -lh img/projects/tall/*.png 2>/dev/null || echo "  (none found)"
echo ""
echo "WebP files:"
ls -lh img/projects/tall/*.webp 2>/dev/null || echo "  (none found)"
```
