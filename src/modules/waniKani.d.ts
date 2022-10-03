type isoString = string;

/**
 * Singular resource endpoints deliver information about a single entity, such as an assignment or subject.
 */
export declare interface Resource<T> {
  /**
   * Resource's unique identifier.
   */
  id: number;
  /**
   * The kind of object returned.
   */
  object: string;
  /**
   * The URL of the request.
   */
  url: string;
  /**
   * The last time that particular resource was upstringd.
   */
  data_upstringd_at: isoString;
  /**
   * The attributes that are specific to that particular instance and kind of resource.
   */
  data: T;
}

/**
 * Collections contain summary data about a bunch of resources, and also include each of the resources.
 */
export declare interface Collection<T> {
  /**
   * The kind of object returned.
   */
  object: string;
  /**
   * The URL of the request.
   */
  url: string;
  /**
   * Contains pagination details.
   */
  pages: {
    /**
     * Maximum number of resources delivered for this collection.
     */
    per_page: number;
    /**
     * The URL of the next page of results. If there are no more results, the value is null.
     */
    next_url: string | null;
    /**
     * The URL of the previous page of results. If there are no results at all or no previous page to go to, the value is null.
     */
    previous_url: string | null;
  };
  total_count: number;
  /**
   * The timestamp of the most recently upstringd resource in the specified scope and is not limited by pagination.
   */
  data_upstringd_at: isoString;
  /**
   * The resources returned by the specified scope.
   */
  data: [T];
}

/**
 * Assignments contain information about a user's progress on a particular
 * subject, including their current state and timestamps for various progress
 * milestones. Assignments are created when a user has passed all the components
 * of the given subject and the assignment is at or below their current level
 * for the first time.
 */
export declare interface Assignment {
  /**
   * Timestamp when the assignment was created.
   */
  created_at: isoString;
  /**
   * Unique identifier of the associated subject.
   */
  subject_id: number;
  /**
   * The type of the associated subject, one of: kanji, radical, or vocabulary.
   */
  subject_type: string;
  /**
   * The current SRS stage interval. The interval range is determined by the related subject's spaced repetition system.
   */
  srs_stage: number;
  /**
   * The timestamp when the related subject has its prerequisites satisfied and is made available in lessons.
   */
  unlocked_at: isoString | null;
  /**
   * Prerequisites are:
   *
   * - The subject components have reached SRS stage 5 once (they have been “passed”).
   * - The user's level is equal to or greater than the level of the assignment’s subject.
   */
  started_at: isoString | null;
  /**
   * Timestamp when the user completes the lesson for the related subject.
   */
  passed_at: isoString | null;
  /**
   * Timestamp when the user reaches SRS stage 5 for the first time.
   */
  burned_at: isoString | null;
  /**
   * Timestamp when the user reaches SRS stage 9 the first time.
   */
  available_at: isoString | null;
  /**
   * Timestamp when the related subject will be available in the user's review queue.
   */
  resurrected_at: isoString | null;
  /**
   * Timestamp when the subject is resurrected and placed back in the user's review queue.
   */
  hidden: boolean;
  /**
   * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
   */
}

/**
 * The collection of assignments will be filtered on the parameters provided.
 */
export declare interface AllAssignmentsParams {
  /**
   * Only assignments available at or after this time are returned.
   */
  available_after?: isoString;
  /**
   * Only assignments available at or before this time are returned.
   */
  available_before?: isoString;
  /**
   * When set to true, returns assignments that have a value in data.burned_at. Returns assignments with a null data.burned_at if false.
   */
  burned?: boolean;
  /**
   * Return assignments with a matching value in the hidden attribute.
   */
  hidden?: boolean;
  /**
   * Only assignments where data.id matches one of the array values are returned.
   */
  ids?: [number];
  /**
   * Only assignments where the associated subject level matches one of the array values are returned. Valid values range from 1 to 60.
   */
  levels?: [number];
  /**
   * Only assignments where data.srs_stage matches one of the array values are returned. Valid values range from 0 to 9
   */
  srs_stages?: [number];
  /**
   * When set to true, returns assignments that have a value in data.started_at. Returns assignments with a null data.started_at if false.
   */
  started?: boolean;
  /**
   * Only assignments where data.subject_id matches one of the array values are returned.
   */
  subject_ids?: [number];
  /**
   * Only assignments where data.subject_type matches one of the array values are returned. Valid values are: radical, kanji, or vocabulary.
   */
  subject_types?: [string];
  /**
   * When set to true, returns assignments that have a value in data.unlocked_at. Returns assignments with a null data.unlocked_at if false.
   */
  unlocked?: boolean;
  /**
   * Only assignments updated after this time are returned.
   */
  updated_after?: isoString;
  /**
   * Custom parameter intended to pass in the following as a string immediately_available_for_lessons, immediately_available_for_review, in_review.
   */
  flags?: [string];
}

/**
 * Retrieves a specific assignment by its id.
 */
export declare interface OneAssignmentParams {
  /**
   * Unique identifier of the assignment.
   */
  id: number;
}

/**
 * Retrieves a specific assignment by its id.
 */
export declare interface StartAssignmentParams {
  /**
   * Unique identifier of the assignment.
   */
  id: number;
  /**
   * Note:
   *
   * - If not set, started_at will default to the time the request is made.
   * - started_at must be greater than or equal to unlocked_at.
   */
  started_at?: isoString;
}

export declare interface LevelProgression {}

export declare interface Reset {}

/**
 * Reviews log all the correct and incorrect answers provided through the
 * 'Reviews' section of WaniKani. Review records are created when a user answers
 * all the parts of a subject correctly once; some subjects have both meaning or
 * reading parts, and some only have one or the other. Note that reviews are not
 * created for the quizzes in lessons.
 */
export declare interface Review {
  /**
   * Timestamp when the review was created.
   */
  created_at: isoString;
  /**
   * Unique identifier of the associated assignment.
   */
  assignment_id: number;
  /**
   * Unique identifier of the associated spaced_repetition_system.
   */
  spaced_repetition_system_id: number;
  /**
   * Unique identifier of the associated subject.
   */
  subject_id: number;
  /**
   * The starting SRS stage interval, with valid values ranging from 1 to 8
   */
  starting_srs_stage: number;
  /**
   * The SRS stage interval calculated from the number of correct and incorrect answers, with valid values ranging from 1 to 9
   */
  ending_srs_stage: number;
  /**
   * The number of times the user has answered the meaning incorrectly.
   */
  incorrect_meaning_answers: number;
  /**
   * The number of times the user has answered the reading incorrectly.
   */
  incorrect_reading_answers: number;
}

/**
 * The collection of reviews will be filtered on the parameters provided.
 */
export declare interface AllReviewsParams {
  /**
   * Only reviews where data.assignment_id matches one of the array values are returned.
   */
  subject_types?: [string];
  /**
   * Only reviews where data.id matches one of the array values are returned.
   */
  unlocked?: boolean;
  /**
   * Only reviews where data.subject_id matches one of the array values are returned.
   */
  updated_after?: isoString;
  /**
   * Only reviews updated after this time are returned.
   */
  flags?: [string];
}

/**
 * Retrieves a specific review  by its id.
 */
export declare interface OneReviewParams {
  /**
   * Unique identifier of the assignment.
   */
  id: number;
}

/**
 * Creates a review for a specific assignment_id. Using the related subject_id
 * is also a valid alternative to using assignment_id.
 *
 * Some criteria must be met in order for a review to be created: available_at
 * must be not null and in the past.
 *
 * When a review is registered, the associated assignment and review_statistic
 * are both updated. These are returned in the response body under
 * resources_updated.
 */
export declare interface CreateReviewParams {
  /**
   * Unique identifier of the assignment. This or subject_id must be set.
   */
  id: number;
  /**
   * Unique identifier of the assignment. This or subject_id must be set.
   */
  assignment_id: number;
  /**
   * Unique identifier of the subject. This or assignment_id must be set.
   */
  subject_id: number;
  /**
   * Must be zero or a positive number. This is the number of times the meaning was answered incorrectly.
   */
  incorrect_meaning_answers: number;
  /**
   * Must be zero or a positive number. This is the number of times the reading was answered incorrectly. Note that subjects with a type or radical do not quiz on readings. Thus, set this value to 0.
   */
  incorrect_reading_answers: number;
  /**
   * Timestamp when the review was completed. Defaults to the time of the request if omitted from the request body. Must be in the past, but after assignment.available_at.
   */
  created_at?: isoString;
}

/**
 * Review statistics summarize the activity recorded in reviews. They contain
 * sum the number of correct and incorrect answers for both meaning and reading.
 * They track current and maximum streaks of correct answers. They store the
 * overall percentage of correct answers versus total answers.
 *
 * A review statistic is created when the user has done their first review on
 * the related subject.
 */
export declare interface ReviewStatistic {
  /**
   * Timestamp when the review statistic was created.
   */
  created_at: isoString;
  /**
   * Unique identifier of the associated subject.
   */
  subject_id: number;
  /**
   * The type of the associated subject, one of: kanji, radical, or vocabulary.
   */
  subject_type: string;
  /**
   * Total number of correct answers submitted for the meaning of the associated subject.
   */
  meaning_correct: number;
  /**
   * Total number of incorrect answers submitted for the meaning of the associated subject.
   */
  meaning_incorrect: number;
  /**
   * The longest, uninterrupted series of correct answers ever given for the meaning of the associated subject.
   */
  meaning_max_streak: number;
  /**
   * The current, uninterrupted series of correct answers given for the meaning of the associated subject.
   */
  meaning_current_streak: number;
  /**
   * Total number of correct answers submitted for the reading of the associated subject.
   */
  reading_correct: number;
  /**
   * Total number of incorrect answers submitted for the reading of the associated subject.
   */
  reading_incorrect: number;
  /**
   * The longest, uninterrupted series of correct answers ever given for the reading of the associated subject.
   */
  reading_max_streak: number;
  /**
   * The current, uninterrupted series of correct answers given for the reading of the associated subject.
   */
  reading_current_streak: number;
  /**
   * The overall correct answer rate by the user for the subject, including both meaning and reading.
   */
  percentage_correct: number;
  /**
   * Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
   */
  hidden: boolean;
}

/**
 * The collection of review statistics will be filtered on the parameters provided.
 */
export declare interface AllReviewStatisticsParams {
  /**
   * Return review statistics with a matching value in the hidden attribute
   */
  hidden?: boolean;
  /**
   * Only review statistics where data.id matches one of the array values are returned.
   */
  ids?: [number];
  /**
   * Return review statistics where the percentage_correct is greater than the value.
   */
  percentages_greater_than?: number;
  /**
   * Return review statistics where the percentage_correct is less than the value.
   */
  percentages_less_than?: number;
  /**
   * Only review statistics where data.subject_id matches one of the array values are returned.
   */
  subject_ids?: [number];
  /**
   * Only review statistics where data.subject_type matches one of the array values are returned. Valid values are: radical, kanji, or vocabulary.
   */
  subject_types?: [number];
  /**
   * Only review statistics updated after this time are returned.
   */
  updated_after?: isoString;
}

/**
 * Retrieves a specific review statistic by its id.
 */
export declare interface OneReviewStatisticParams {
  /**
   * Unique identifier of the review_statistic.
   */
  id: number;
}

export declare interface SpacedRepetitionSystem {}

export declare interface StudyMaterial {}

export declare interface Subject {}

export declare interface Summary {}

export declare interface User {}

export declare interface VoiceActor {}

export declare type AssignmentResource = Resource<Assignment>;

export declare type AssignmentCollection = Collection<AssignmentResource>;

export declare type ReviewResource = Resource<Review>;

export declare type ReviewCollection = Collection<ReviewResource>;

export declare type ReviewStatisticResource = Resource<ReviewStatistic>;

export declare type ReviewStatisticsCollection =
  Collection<ReviewStatisticResource>;
