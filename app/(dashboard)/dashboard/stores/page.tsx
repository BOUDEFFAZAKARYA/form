import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"
import { RocketIcon } from "@radix-ui/react-icons"
import { desc, eq, sql } from "drizzle-orm"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"

import { Shell } from "@/components/shells/shell"
import { env } from "process"
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/pageHeader"
import { StoreCard } from "@/components/cards/store-card"

export const metadata: Metadata = {
  title: "Stores",
  description: "Manage your stores",
}

export default async function StoresPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }
  const allStores = await db
  .select({
    id: stores.id,
    name: stores.name,
    description: stores.description,
    stripeAccountId: stores.stripeAccountId,
  })
  .from(stores)
  .leftJoin(products, eq(products.storeId, stores.id))
  .groupBy(stores.id)
  .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`))
  .where(eq(stores.userId, user.id))
  

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="dashboard-stores-page-header"
        aria-labelledby="dashboard-stores-page-header-heading"
      >
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Stores
          </PageHeaderHeading>
          <Link
            aria-label="Create store"
            href={"stores/new"}
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
            Create store
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your stores
        </PageHeaderDescription>
      </PageHeader>
      <Alert
        id="dashboard-stores-page-alert"
        aria-labelledby="dashboard-stores-page-alert-heading"
      >
        <RocketIcon className="w-4 h-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You are currently on the{" "}
       
          this plan.
        </AlertDescription>
      </Alert>
     {  <section
        id="dashboard-stores-page-stores"
        aria-labelledby="dashboard-stores-page-stores-heading"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {allStores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            href={`/dashboard/stores/${store.id}`}
          />
        ))}
      </section> }
    </Shell>
  )
}