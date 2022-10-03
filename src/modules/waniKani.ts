import axios from "axios";

import * as api from "./waniKani.d";
import { getToken, paramString } from "../utils/helpers/api_helpers";

export async function getAllAssignments(params?: api.AllAssignmentsParams) {
  return await _internalGetAllAssignments({ params: params });
}

const _internalGetAllAssignments = async ({
  params,
  token,
  url,
}: {
  params?: api.AllAssignmentsParams;
  token?: string;
  url?: string;
}) => {
  token = await getToken(token);

  let { data } = await axios.get<api.AssignmentCollection>(
    (url ?? "https://api.wanikani.com/v2/assignments") +
      paramString(params ?? {}),
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "get",
    }
  );

  let assignments = data?.data;
  if (data?.pages?.next_url) {
    const nextPage = await _internalGetAllAssignments({
      token: token,
      url: data.pages.next_url,
    });
    assignments.concat(nextPage);
  }

  return assignments;
};

export async function getOneAssignment(params: api.OneAssignmentParams) {
  return await _internalGetOneAssignment({ params: params });
}

const _internalGetOneAssignment = async ({
  params,
}: {
  params: api.OneAssignmentParams;
}) => {
  let { data } = await axios.get<api.AssignmentResource>(
    "https://api.wanikani.com/v2/assignments/" + params.id,
    {
      headers: { Authorization: `Bearer ${await getToken()}` },
      method: "get",
    }
  );

  return data?.data;
};

export async function getAllReviews(params?: api.AllReviewsParams) {
  return await _internalGetAllReviews({ params: params });
}

const _internalGetAllReviews = async ({
  params,
  token,
  url,
}: {
  params?: api.AllReviewsParams;
  token?: string;
  url?: string;
}) => {
  token = await getToken(token);

  let { data } = await axios.get<api.ReviewCollection>(
    (url ?? "https://api.wanikani.com/v2/reviews") + paramString(params ?? {}),
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "get",
    }
  );

  let reviews = data?.data;
  if (data?.pages?.next_url) {
    const nextPage = await _internalGetAllReviews({
      token: token,
      url: data.pages.next_url,
    });
    reviews.concat(nextPage);
  }

  return reviews;
};

export async function getOneReview(params: api.OneReviewParams) {
  return await _internalGetOneReview({ params: params });
}

const _internalGetOneReview = async ({
  params,
}: {
  params: api.OneReviewParams;
}) => {
  let { data } = await axios.get<api.ReviewResource>(
    "https://api.wanikani.com/v2/reviews/" + params.id,
    {
      headers: { Authorization: `Bearer ${await getToken()}` },
      method: "get",
    }
  );

  return data?.data;
};

export async function getAllReviewStatistics(
  params?: api.AllReviewStatisticsParams
) {
  return await _internalGetAllReviewStatistics({ params: params });
}

const _internalGetAllReviewStatistics = async ({
  params,
  token,
  url,
}: {
  params?: api.AllReviewStatisticsParams;
  token?: string;
  url?: string;
}) => {
  token = await getToken(token);

  let { data } = await axios.get<api.ReviewStatisticsCollection>(
    url ??
      "https://api.wanikani.com/v2/review_statistics" +
        paramString(params ?? {}),
    {
      headers: { Authorization: `Bearer ${token}` },
      method: "get",
    }
  );

  let reviewStatistics = data?.data;
  if (data?.pages?.next_url) {
    reviewStatistics.concat(
      await _internalGetAllReviewStatistics({
        token: token,
        url: data.pages.next_url,
      })
    );
  }

  return reviewStatistics;
};

export async function getOneReviewStatistic(
  params: api.OneReviewStatisticParams
) {
  return await _internalGetOneReviewStatistic({ params: params });
}

const _internalGetOneReviewStatistic = async ({
  params,
}: {
  params: api.OneReviewStatisticParams;
}) => {
  let { data } = await axios.get<api.ReviewStatisticResource>(
    "https://api.wanikani.com/v2/review_statistics/" + params.id,
    {
      headers: { Authorization: `Bearer ${await getToken()}` },
      method: "get",
    }
  );

  return data?.data;
};
