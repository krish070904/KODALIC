import "server-only";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID;

if (!GA4_PROPERTY_ID) {
  throw new Error("GA4_PROPERTY_ID is not configured.");
}

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

const analyticsDataClient =
  GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY
    ? new BetaAnalyticsDataClient({
        credentials: {
          client_email: GOOGLE_CLIENT_EMAIL,
          private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
      })
    : new BetaAnalyticsDataClient();

export type GA4Overview = {
  activeUsers: number;
  sessions: number;
  screenPageViews: number;
  engagementRate: number;
};

export async function getGA4Overview(
  days = 30,
): Promise<GA4Overview> {
  if (!Number.isInteger(days) || days < 1) {
    throw new Error("GA4 overview days must be a positive integer.");
  }

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: `${days}daysAgo`,
        endDate: "today",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
      {
        name: "sessions",
      },
      {
        name: "screenPageViews",
      },
      {
        name: "engagementRate",
      },
    ],
  });

  const row = response.rows?.[0];

  if (!row) {
    return {
      activeUsers: 0,
      sessions: 0,
      screenPageViews: 0,
      engagementRate: 0,
    };
  }

  const values = row.metricValues ?? [];

  return {
    activeUsers: Number(values[0]?.value ?? 0),
    sessions: Number(values[1]?.value ?? 0),
    screenPageViews: Number(values[2]?.value ?? 0),
    engagementRate: Number(values[3]?.value ?? 0),
  };
}

export type GA4TopPage = {
  path: string;
  view_count: number;
};

export async function getGA4TopPages(
  days = 30,
  limit = 5,
): Promise<GA4TopPage[]> {
  if (!Number.isInteger(days) || days < 1) {
    throw new Error("GA4 top pages days must be a positive integer.");
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("GA4 top pages limit must be a positive integer.");
  }

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${GA4_PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: `${days}daysAgo`,
        endDate: "today",
      },
    ],
    dimensions: [
  {
    name: "pagePath",
  },
],
dimensionFilter: {
  notExpression: {
    filter: {
      fieldName: "pagePath",
      stringFilter: {
        matchType: "BEGINS_WITH",
        value: "/admin",
      },
    },
  },
},
metrics: [
      {
        name: "screenPageViews",
      },
    ],
    orderBys: [
      {
        metric: {
          metricName: "screenPageViews",
        },
        desc: true,
      },
    ],
    limit,
  });

  return (response.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? "/",
    view_count: Number(
      row.metricValues?.[0]?.value ?? 0,
    ),
  }));
}