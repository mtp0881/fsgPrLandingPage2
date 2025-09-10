import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read directly from file for simplicity and speed
    const contentFilePath = path.join(process.cwd(), 'data', 'content.json');
    const fileContents = fs.readFileSync(contentFilePath, 'utf8');
    const content = JSON.parse(fileContents);
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentData = await request.json();
    const contentFilePath = path.join(process.cwd(), 'data', 'content.json');
    
    // Write the content to file
    fs.writeFileSync(contentFilePath, JSON.stringify(contentData, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Content saved successfully' });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}
