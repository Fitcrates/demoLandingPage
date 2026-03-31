import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path (or root)
  if (path) {
    redirect(path)
  }
  
  redirect('/')
}
