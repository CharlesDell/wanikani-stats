/**
 *
 */
declare function getAllReviewStatistics(): Promise<[ReviewStatisticResource]>;

// Type Definitions

/**
 * Singular resource endpoints deliver information about a single entity, such as an assignment or subject.
 *
 * @template T - Type of Resource.
 * @property {number} id - Resource's unique identifier.
 * @property {string} object - The kind of object returned.
 * @property {string} url - The URL of the request.
 * @property {string} data_upstringd_at - The last time that particular resource was upstringd.
 * @property {T} data - The attributes that are specific to that particular instance and kind of resource.
 */
export declare type Resource<T> = {
  id: number;
  object: string;
  url: string;
  data_upstringd_at: string;
  data: T;
};

/**
 * Collections contain summary data about a bunch of resources, and also include each of the resources.
 *
 * @template T - Type of resources held by collection.
 * @property {string} object - The kind of object returned.
 * @property {string} url - The URL of the request.
 * @property {string} data_upstringd_at - The timestamp of the most recently upstringd resource in the specified scope and is not limited by pagination.
 * @property {T} data - The resources returned by the specified scope.
 * @property {object} pages - Contains collection pagination details.
 * @property {number} pages.per_page - Maximum number of resources delivered for this collection.
 * @property {string | null} pages.next_url - The URL of the next page of results. If there are no more results, the value is null.
 * @property {string | null} pages.previous_url - The URL of the previous page of results. If there are no results at all or no previous page to go to, the value is null.
 */
export declare type Collection<T> = {
  object: string;
  url: string;
  pages: {
    per_page: number;
    next_url: string | null;
    previous_url: string | null;
  };
  total_count: number;
  data_upstringd_at: string;
  data: [T];
};

/**
 * Assignments contain information about a user's progress on a particular
 * subject, including their current state and timestamps for various progress
 * milestones. Assignments are created when a user has passed all the components
 * of the given subject and the assignment is at or below their current level
 * for the first time.
 *
 * @property {string} created_at - Timestamp when the assignment was created.
 * @property {number} subject_id - Unique identifier of the associated subject.
 * @property {string} subject_type - The type of the associated subject, one of: kanji, radical, or vocabulary.
 * @property {number} srs_stage - The current SRS stage interval. The interval range is determined by the related subject's spaced repetition system.
 * @property {string | null} unlocked_at - The timestamp when the related subject has its prerequisites satisfied and is made available in lessons.
 * Prerequisites are:
 *
 * - The subject components have reached SRS stage 5 once (they have been “passed”).
 * - The user's level is equal to or greater than the level of the assignment’s subject.
 * @property {string | null} started_at - Timestamp when the user completes the lesson for the related subject.
 * @property {string | null} passed_at - Timestamp when the user reaches SRS stage 5 for the first time.
 * @property {string | null} burned_at - Timestamp when the user reaches SRS stage 9 the first time.
 * @property {string | null} available_at - Timestamp when the related subject will be available in the user's review queue.
 * @property {string | null} resurrected_at - Timestamp when the subject is resurrected and placed back in the user's review queue.
 * @property {boolean} hidden - Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
 */
export declare type Assignment = {
  created_at: string;
  subject_id: number;
  subject_type: string;
  srs_stage: number;
  unlocked_at: string | null;
  started_at: string | null;
  passed_at: string | null;
  burned_at: string | null;
  available_at: string | null;
  resurrected_at: string | null;
  hidden: boolean;
};

export declare type Kanji = {};

export declare type LevelProgression = {};

export declare type Radical = {};

export declare type Reset = {};

export declare type Review = {};

export declare type SpacedRepetitionSystem = {};

export declare type StudyMaterial = {};

export declare type User = {};

export declare type Vocabulary = {};

/**
 * Review statistics summarize the activity recorded in reviews. They contain
 * sum the number of correct and incorrect answers for both meaning and reading.
 * They track current and maximum streaks of correct answers. They store the
 * overall percentage of correct answers versus total answers.
 *
 * A review statistic is created when the user has done their first review on
 * the related subject.
 *
 * @property {string} created_at - Timestamp when the review statistic was created.
 * @property {number} subject_id - Unique identifier of the associated subject.
 * @property {string} subject_type - The type of the associated subject, one of: kanji, radical, or vocabulary.
 * @property {number} meaning_correct - Total number of correct answers submitted for the meaning of the associated subject.
 * @property {number} meaning_incorrect - Total number of incorrect answers submitted for the meaning of the associated subject.
 * @property {number} meaning_max_streak - The longest, uninterrupted series of correct answers ever given for the meaning of the associated subject.
 * @property {number} meaning_current_streak - The current, uninterrupted series of correct answers given for the meaning of the associated subject.
 * @property {number} reading_correct - Total number of correct answers submitted for the reading of the associated subject.
 * @property {number} reading_incorrect - Total number of incorrect answers submitted for the reading of the associated subject.
 * @property {number} reading_max_streak - The longest, uninterrupted series of correct answers ever given for the reading of the associated subject.
 * @property {number} reading_current_streak - The current, uninterrupted series of correct answers given for the reading of the associated subject.
 * @property {number} percentage_correct - The overall correct answer rate by the user for the subject, including both meaning and reading.
 * @property {boolean} hidden - Indicates if the associated subject has been hidden, preventing it from appearing in lessons or reviews.
 */
export declare type ReviewStatistic = {
  created_at: string;
  subject_id: number;
  subject_type: string;
  meaning_correct: number;
  meaning_incorrect: number;
  meaning_max_streak: number;
  meaning_current_streak: number;
  reading_correct: number;
  reading_incorrect: number;
  reading_max_streak: number;
  reading_current_streak: number;
  percentage_correct: number;
  hidden: boolean;
};

export declare type AssignmentResource = Resource<Assignment>;

export declare type AssignmentCollection = Collection<AssignmentResource>;

export declare type ReviewStatisticResource = Resource<ReviewStatistic>;

export declare type ReviewStatisticsCollection =
  Collection<ReviewStatisticResource>;
