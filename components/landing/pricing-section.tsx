import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for your business
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Starter</h3>
              <p className="text-muted-foreground">Perfect for small businesses</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $29<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Up to 500 products</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>2 user accounts</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Email support</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/auth/signup">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Popular
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Professional</h3>
              <p className="text-muted-foreground">For growing businesses</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $79<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Up to 5,000 products</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>10 user accounts</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Forecasting tools</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/auth/signup">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-muted-foreground">For large organizations</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $199<span className="text-sm font-normal text-muted-foreground">/month</span>
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Unlimited products</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Custom analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Unlimited users</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>24/7 dedicated support</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>API access</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Custom integrations</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/auth/signup">
                <Button className="w-full">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
