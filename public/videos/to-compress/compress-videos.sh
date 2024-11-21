#!/bin/bash

input_dir="$(pwd)"
output_dir="$(pwd)/../stream-videos"

# Create the output directory if it doesn't exist
mkdir -p "$output_dir"

# Function to process video files
process_videos() {
  local extension=$1
  for input_file in "$input_dir"/*.$extension; do
    # Check if there are no files with the given extension
    if [ ! -e "$input_file" ]; then
      continue
    fi

    # Get the base name of the file (without extension)
    base_name=$(basename "$input_file" .$extension)

    # Define correct path for the master playlist
    master_playlist_name="index.m3u8"

     # Create a directory for the output files
    mkdir -p "$output_dir/$base_name"

    # Run the ffmpeg command
    ffmpeg -i "$input_file" \
      -filter_complex "[0:v]split=3[vid0][vid1][vid2]; \
                       [vid0]scale=ceil(iw/2)*2:ceil(ih/2)*2[b0]; \
                       [vid1]scale=ceil(iw*2/3)*2:ceil(ih*2/3)*2[b1]; \
                       [vid2]scale=iw:ih[b2]" \
      -map "[b0]" -b:v:0 800k -c:v:0 libx264 -profile:v:0 baseline -level:v:0 3.0 -g 48 -keyint_min 48 \
      -map "[b1]" -b:v:1 1400k -c:v:1 libx264 -profile:v:1 main -level:v:1 3.1 -g 48 -keyint_min 48 \
      -map "[b2]" -b:v:2 3000k -c:v:2 libx264 -profile:v:2 high -level:v:2 4.0 -g 48 -keyint_min 48 \
      -an \
      -f hls -hls_time 4 -hls_flags split_by_time \
      -master_pl_name "$master_playlist_name" \
      -var_stream_map "v:0 v:1 v:2" \
      -hls_segment_filename "$output_dir/$base_name/stream_$base_name_%v_%03d.ts" \
      "$output_dir/$base_name/${base_name}-output_%v.m3u8"
  done
}

process_videos "mp4"
process_videos "m4v"
process_videos "mov"
process_videos "webm"