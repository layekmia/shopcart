import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon } from "lucide-react";

export function AboutProduct() {
  return (
    <div className="flex w-full lg:max-w-3xl flex-col gap-6 pb-10">
      <Tabs defaultValue="description">
        <TabsList className="w-full p-0 flex gap-2 mb-5">
          <TabsTrigger
            value="description"
            className="
      w-full rounded-lg py-2.5 text-xs md:text-sm leading-5
      text-dark-color font-medium tracking-wide
      bg-transparent
      focus:outline-none
      data-[state=active]:bg-white
      data-[state=active]:shadow-sm
      data-[state=active]:text-shop_dark_green
      data-[state=active]:font-semibold
      data-[state=active]:ring-1
      data-[state=active]:ring-white
      data-[state=active]:ring-opacity-60
      data-[state=active]:ring-offset-1
      data-[state=active]:ring-offset-shop_dark_green
    "
          >
            Description
          </TabsTrigger>

          <TabsTrigger
            value="info"
            className="
      w-full rounded-lg py-2.5 text-xs md:text-sm leading-5
      text-dark-color font-medium tracking-wide
      bg-transparent
      focus:outline-none
      data-[state=active]:bg-white
      data-[state=active]:shadow-sm
      data-[state=active]:text-shop_dark_green
      data-[state=active]:font-semibold
      data-[state=active]:ring-1
      data-[state=active]:ring-white
      data-[state=active]:ring-opacity-60
      data-[state=active]:ring-offset-1
      data-[state=active]:ring-offset-shop_dark_green
    "
          >
            Additional Information
          </TabsTrigger>

          <TabsTrigger
            value="reviews"
            className="
      w-full rounded-lg py-2.5 text-xs md:text-sm leading-5
      text-dark-color font-medium tracking-wide
      bg-transparent
      focus:outline-none
      data-[state=active]:bg-white
      data-[state=active]:shadow-sm
      data-[state=active]:text-shop_dark_green
      data-[state=active]:font-semibold
      data-[state=active]:ring-1
      data-[state=active]:ring-white
      data-[state=active]:ring-opacity-60
      data-[state=active]:ring-offset-1
      data-[state=active]:ring-offset-shop_dark_green
    "
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <div className="space-y-4 text-sm md:text-base text-gray-700 leading-relaxed">
            <p>
              In ducimus quod sed eum repellendus ea fugiat. Pariatur et illo at
              iure harum. Molestiae a itaque voluptas explicabo praesentium.
              Possimus omnis aut architecto et. Repellendus ab ipsa in non
              doloremque tenetur est doloremque.
            </p>

            <p>
              Quam in facere soluta consequatur voluptatem beatae asperiores.
              Qui quia itaque illo eos quibusdam voluptatem et. Est aut deserunt
              iste. Et ipsum eius ut odit deleniti.
            </p>

            <p>
              Officia praesentium ipsam perferendis possimus ex culpa voluptatem
              dolore. Aut id sit et vitae. Quis unde doloremque quisquam facere.
              In qui eos est voluptatem repudiandae blanditiis consequatur.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="info">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm md:text-base">
              <tbody>
                <tr className="border-b">
                  <th className="w-1/3 bg-gray-50 px-4 py-3 text-left font-medium text-gray-700">
                    Weight
                  </th>
                  <td className="px-4 py-3 text-gray-600">190 kg</td>
                </tr>

                <tr>
                  <th className="w-1/3 bg-gray-50 px-4 py-3 text-left font-medium text-gray-700">
                    Dimensions
                  </th>
                  <td className="px-4 py-3 text-gray-600">3 × 72 × 109 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="pb-5">
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index + 1}
                      size={13}
                      className={
                        index < 4
                          ? "text-shop_lighter_green"
                          : "text-shop_light_text"
                      }
                      fill={index < 4 ? "#93d991" : "#ababab"}
                    />
                  ))}
                </div>
                <p className="text-shop_light_text text-xs tracking-wide">
                  <span className="font-bold text-sm text-darkColor">
                    {" "}
                    Duc Pham
                  </span>{" "}
                  - July 21,2025
                </p>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the
                chest and shoulders. My only complaint is that it is so long! I
                like to wear polo shirts untucked. This shirt goes completely
                past my rear end. If I wore it with ordinary shorts, you
                probably wouldnt be able to see the shorts at all – completely
                hidden by the shirt. It needs to be 4 to 5 inches shorter in
                terms of length to suit me. I have many RL polo shirts, and this
                one is by far the longest. I dont understand why.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index + 1}
                      size={13}
                      className={
                        index < 4
                          ? "text-shop_lighter_green"
                          : "text-shop_light_text"
                      }
                      fill={index < 4 ? "#93d991" : "#ababab"}
                    />
                  ))}
                </div>
                <p className="text-shop_light_text text-xs tracking-wide">
                  <span className="font-bold text-sm text-darkColor">
                    {" "}
                    Duc Pham
                  </span>{" "}
                  - July 21,2025
                </p>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the
                chest and shoulders. My only complaint is that it is so long! I
                like to wear polo shirts untucked. This shirt goes completely
                past my rear end. If I wore it with ordinary shorts, you
                probably wouldnt be able to see the shorts at all – completely
                hidden by the shirt. It needs to be 4 to 5 inches shorter in
                terms of length to suit me. I have many RL polo shirts, and this
                one is by far the longest. I dont understand why.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index + 1}
                      size={13}
                      className={
                        index < 4
                          ? "text-shop_lighter_green"
                          : "text-shop_light_text"
                      }
                      fill={index < 4 ? "#93d991" : "#ababab"}
                    />
                  ))}
                </div>
                <p className="text-shop_light_text text-xs tracking-wide">
                  <span className="font-bold text-sm text-darkColor">
                    {" "}
                    Duc Pham
                  </span>{" "}
                  - July 21,2025
                </p>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the
                chest and shoulders. My only complaint is that it is so long! I
                like to wear polo shirts untucked. This shirt goes completely
                past my rear end. If I wore it with ordinary shorts, you
                probably wouldnt be able to see the shorts at all – completely
                hidden by the shirt. It needs to be 4 to 5 inches shorter in
                terms of length to suit me. I have many RL polo shirts, and this
                one is by far the longest. I dont understand why.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
