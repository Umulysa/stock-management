export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Trusted by businesses worldwide</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our customers have to say about how iStock has transformed their inventory management.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                "iStock has revolutionized how we manage our warehouse. The real-time analytics have helped us reduce
                stockouts by 35%."
              </p>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="rounded-full bg-muted h-10 w-10" />
              <div>
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Operations Manager, TechSupply Inc.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                "The order management system is intuitive and has streamlined our fulfillment process. We've cut
                processing time in half!"
              </p>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="rounded-full bg-muted h-10 w-10" />
              <div>
                <p className="text-sm font-medium">Michael Chen</p>
                <p className="text-sm text-muted-foreground">Logistics Director, Global Retail</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border p-6 shadow-sm">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                "As a small business, iStock has given us enterprise-level inventory control at an affordable price.
                Couldn't be happier."
              </p>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="rounded-full bg-muted h-10 w-10" />
              <div>
                <p className="text-sm font-medium">Jessica Martinez</p>
                <p className="text-sm text-muted-foreground">Owner, Artisan Crafts Co.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
