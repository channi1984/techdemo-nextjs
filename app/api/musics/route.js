import { NextResponse } from "next/server";
import { musics, pageInfo } from "@/data/musicsDada";

export async function GET() {
	//musics와 pageInfo를 하나의 객체로 합침.
	const responseData = {
		...pageInfo,
		musics: musics,
	}
	return NextResponse.json(responseData);
}