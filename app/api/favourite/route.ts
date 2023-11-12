import Favourite from "@/database/favourite";
import { connectToDatabase } from "@/lib/mongoose";
import { FavouriteProps } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { accountId, movieId, title, _id, uid, overview, type, poster_path, backdrop_path }: FavouriteProps =
      await req.json();

    const isExist = await Favourite.findOne({ uid, movieId, accountId });

    if (!isExist) {
      return NextResponse.json({ success: false, message: "Already added to favourite" });
    }

    const favourite = await Favourite.create({ uid, accountId, movieId, type, poster_path, backdrop_path });

    return NextResponse.json({ success: true, data: favourite });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong" });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    const accountId = searchParams.get("accountId");

    const favourites = await Favourite.find({ uid, accountId });

    return NextResponse.json({ success: true, data: favourites });
  } catch (error) {}
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Favourite.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    return NextResponse.json({ success: true, message: "Something went wrong" });
  }
}
