import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Posts from "../../../models/Posts";
import { redirect } from "next/dist/server/api-utils";

export async function GET() {
    await dbConnect();
    try {
        const posts = await Posts.find({});
        return NextResponse.json({status: 200, data: posts});
    } catch (err) {
        console.log(err)
        return NextResponse.json({status: 500, message: "could not find posts"});
    }
}

export async function POST(req) {
    await dbConnect();
    const {title, description} = await req.json();
    try {
        const post = await new Posts({title, description});
        post.save();
        return NextResponse.json({status: 200, data: post});
    } catch (err) {
        console.log(err)
        return NextResponse.json({status: 500, message: "could not create post"});
    }
}

export async function PUT(req) {
    await dbConnect();
    const {title, description, id} = await req.json();
    try{
        const posts = await Posts.findByIdAndUpdate(id,{title, description});
        return NextResponse.json({status: 200, data: posts});
    } catch (err) {
        console.log(err)
        return NextResponse.json({status: 500, message: "could not update post"});
    }
}

export async function DELETE(req) {
    await dbConnect();
    const {id} = await req.json();
    try {
        const posts = await Posts.findByIdAndDelete(id);
        return NextResponse.json({status: 200, data: posts});
    } catch (err) {
        console.log(err)
        return NextResponse.json({status: 500, message: "could not delete post"});
    }
}