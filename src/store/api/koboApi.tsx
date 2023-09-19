import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Ebook {
  affiliateUrl: string;
  author: string;
  itemCaption: string;
  itemNumber: string;
  itemPrice: number;
  itemUrl: string;
  title: string;
  largeImageUrl: string;
  mediumImageUrl: string;
  publisherName: string;
  reviewAverage: string;
  reviewCount: number;
  smallImageUrl: string;
  salesDate: string;
}

interface EbookResponse {
  Items: { Item: Ebook }[];
}

export const koboApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app.rakuten.co.jp/services/api/",
  }),
  endpoints: (builder) => ({
    searchEbooks: builder.query<EbookResponse, string>({
      query: (keyword) =>
        `Kobo/EbookSearch/20170426?format=json&keyword=${encodeURIComponent(
          keyword
        )}&applicationId=1082332836738661201`,
    }),
  }),
});
export const { useSearchEbooksQuery } = koboApi;
