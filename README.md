This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Responsive

Please refer to the following link for more information on how to use Tailwind CSS for responsive design:
https://tailwindcss.com/docs/responsive-design

The used breakpoints are:

- `sm`: 640px
- `xl`: 1280px

## Videos

The videos are hosted on the public folder on hls format.
HLS is a streaming protocol that was developed by Apple. It is widely used for streaming video on the internet. [HLS](https://developer.apple.com/streaming/) is a protocol that breaks the overall stream into a sequence of small HTTP-based file downloads. Each download loads one short chunk of the overall video file. As the video plays, the client player requests the next chunk of the video file.

To compress the videos there is a bash script that uses [ffmpeg](https://www.ffmpeg.org/).

To use the script you need to have ffmpeg installed on your machine. Follow the instructions on the website mentioned above to install it.

To compress the videos add the desired videos to the `public/videos/to-compress` folder and run the following command:

```bash
  sh public/videos/to-compress/compress-videos.sh
```

This script will compress any videos placed on this folder and output the compressed videos to the `public/videos/stream-videos` folder. Then they can be played by the VideoPlayer component or the Globe which is configured to use HLS.

The videos will be compressed to 3 different qualities depending on the output device. The [videojs](https://videojs.com/) library will automatically select the best quality based on the user's internet connection.

If you open this script you can adjust video output quality the -b:v:0, -b:v:1 and -b:v:2 values to change the video quality.

## 3d Globe

The 3d globe is a component that uses [react-three-fiber](https://r3f.docs.pmnd.rs/) a react library to use [Three.js](https://threejs.org/).

The globes use either VideoMaterial or GlobeShaderMaterial to display the videos on the globe. The VideoMaterial uses the HLS videos to display the videos on the globe. The GlobeShaderMaterial uses a shader to emulate a translucent globe.