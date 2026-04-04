import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { realtimeClient } from "@/sanity/lib/client";
import { FileX } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    return redirect("/");
  }

  // Fetch orders for this user based on clerkUserId or email
  const fetchOrders = async () => {
    try {
      const query = `*[_type == "order" && (clerkUserId == $userId || email == $email)] | order(orderDate desc)`;
      const orders = await realtimeClient.fetch(query, {
        userId: session.user.id,
        email: session.user.email,
      });
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };

  const orders = await fetchOrders();

  return (
    <div>
      <Container className="py-10">
        {orders?.length > 0 ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Order List</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] md:w-auto">
                        Order Number
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Invoice Number
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders} />
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <FileX className="h-24 w-24 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900">
              No orders found
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
              It looks like you haven&apos;t placed any orders yet. Start
              shopping to see your orders here!
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Browse Products</Link>
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;
