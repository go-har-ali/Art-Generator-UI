import collection from "@/data/FrontEndEvalution.postman_collection.json";

type CollectionVariable = {
  key: string;
  value: string;
};

const variables = (collection.variable as CollectionVariable[]) ?? [];
const resolveValue = (key: string) =>
  variables.find((entry) => entry.key === key)?.value ?? "";

const API_BASE_URL = resolveValue("ip");
const API_TOKEN = resolveValue("token_value");
const MEDIA_BASE_URL = "http://cognise.art";

const defaultHeaders = {
  Authorization: API_TOKEN,
  "Content-Type": "application/json",
};

const buildAssetUrl = (path?: string | null) => {
  if (!path) return "";
  const trimmed = path.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  try {
    return new URL(trimmed, MEDIA_BASE_URL).toString();
  } catch {
    return trimmed;
  }
};

const ensureReachableImage = async (
  candidate: string,
  fallback: string
): Promise<string> => {
  if (candidate) {
    try {
      const response = await fetch(candidate, { method: "HEAD" });
      if (response.ok) {
        return candidate;
      }
    } catch {
      // ignore and return fallback
    }
  }
  return fallback;
};

const fallbackInspirationImages = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&q=80",
];

const fallbackModelImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80",
];

type InspirationsApiResponse = {
  status?: string;
  message?: string | null;
  data?: {
    pagination_info?: unknown;
    data?: {
      id: number;
      generation_info?: {
        prompt?: string;
      };
      images?: {
        image?: string;
        watermark?: string;
      }[];
    }[];
  };
};

type ModelsApiResponse = {
  status?: string;
  message?: string | null;
  data?: {
    status?: string;
    data?: {
      id: number;
      name: string;
      image?: string;
    }[];
  };
};

export type Inspiration = {
  id: number;
  title: string;
  image: string;
};

export type ModelItem = {
  id: string;
  model: string;
  style?: string;
  label: string;
  thumbnail: string;
};

export const getInspirations = async (): Promise<Inspiration[]> => {
  const url = new URL("/api/inspirations", API_BASE_URL);
  url.searchParams.set("pagination", "15");
  url.searchParams.set("page", "1");

  const response = await fetch(url, {
    headers: defaultHeaders,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch inspirations");
  }

  const json = (await response.json()) as InspirationsApiResponse;
  const rawItems = json?.data?.data ?? [];

  const mapped = await Promise.all(
    rawItems.map(async (item, index) => {
      const remote =
        buildAssetUrl(item.images?.[0]?.image) ??
        buildAssetUrl(item.images?.[0]?.watermark);
      const fallback =
        fallbackInspirationImages[index % fallbackInspirationImages.length];
      const image = await ensureReachableImage(remote ?? "", fallback);
      return {
        id: item.id,
        title: item.generation_info?.prompt ?? "AI Inspiration",
        image,
      };
    })
  );

  return mapped;
};

export const getModels = async (): Promise<ModelItem[]> => {
  const url = new URL("/api/generation/models", API_BASE_URL);

  const response = await fetch(url, {
    headers: defaultHeaders,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch models");
  }

  const json = (await response.json()) as ModelsApiResponse;
  const rawItems = json?.data?.data ?? [];

  const mapped = await Promise.all(
    rawItems.map(async (item, index) => {
      const remote = buildAssetUrl(item.image);
      const fallback =
        fallbackModelImages[index % fallbackModelImages.length];
      const thumbnail = await ensureReachableImage(remote ?? "", fallback);
      return {
        id: String(item.id),
        model: item.name,
        style: item.name,
        label: item.name,
        thumbnail,
      };
    })
  );

  return mapped;
};

export const getApiConfig = () => ({
  baseUrl: API_BASE_URL,
  token: API_TOKEN,
});

