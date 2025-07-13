import { v2 as cloudinary } from "cloudinary";
// const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const signature = cloudinary.utils.api_sign_request(
    body.paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );
  return Response.json({ signature }, { status: 200 });
}
