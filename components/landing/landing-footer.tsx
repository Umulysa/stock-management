import Link from "next/link"

export function LandingFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">iStock</span>
          </Link>
          <p className="text-sm text-muted-foreground">Modern inventory management for businesses of all sizes.</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm hover:underline underline-offset-4">
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">© 2023 iStock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
