import { NextResponse } from "next/server";

// TODO: Connect to Supabase/SQLite for real signal data
// For now returns empty so components use their mock data
export async function GET() {
  return NextResponse.json({ signals: [] });
}
