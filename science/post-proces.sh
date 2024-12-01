#!/bin/bash

set -eux

# Set the video bitrate and quality
BITRATE="1M"
CRF="30"

# Loop through all .mp4 files in the current directory
for input_file in data/03_primary/*.mp4; do
  # Get the base name without extension
  base_name=$(basename "$input_file" .mp4)

  # First pass (no actual output, just analysis)
  ffmpeg -i "$input_file" -c:v libvpx-vp9 -b:v $BITRATE -crf $CRF -pass 1 -an -f null /dev/null

  # Second pass (produce output .webm file)
  ffmpeg -i "$input_file" -c:v libvpx-vp9 -b:v $BITRATE -crf $CRF -pass 2 -an "data/03_primary/${base_name}.webm"

  # Clean up the log files created during the two-pass process
  rm -f ffmpeg2pass-0.log
done

echo "Conversion completed for all .mp4 files!"
