/* eslint-disable */
import * as Types from '../../types/types';

import { BasicActivityFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { BasicActivityFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  daterange: any;
  float8: any;
  interval: any;
  json: any;
  timestamp: any;
  timestamptz: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['Boolean']>;
  readonly _gt?: Maybe<Scalars['Boolean']>;
  readonly _gte?: Maybe<Scalars['Boolean']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['Boolean']>;
  readonly _lte?: Maybe<Scalars['Boolean']>;
  readonly _neq?: Maybe<Scalars['Boolean']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['Int']>;
  readonly _gt?: Maybe<Scalars['Int']>;
  readonly _gte?: Maybe<Scalars['Int']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['Int']>;
  readonly _lte?: Maybe<Scalars['Int']>;
  readonly _neq?: Maybe<Scalars['Int']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['String']>;
  readonly _gt?: Maybe<Scalars['String']>;
  readonly _gte?: Maybe<Scalars['String']>;
  readonly _ilike?: Maybe<Scalars['String']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _like?: Maybe<Scalars['String']>;
  readonly _lt?: Maybe<Scalars['String']>;
  readonly _lte?: Maybe<Scalars['String']>;
  readonly _neq?: Maybe<Scalars['String']>;
  readonly _nilike?: Maybe<Scalars['String']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly _nlike?: Maybe<Scalars['String']>;
  readonly _nsimilar?: Maybe<Scalars['String']>;
  readonly _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "achievement" */
export type Achievement = {
  readonly __typename: 'achievement';
  /** An object relationship */
  readonly achievementTypeByAchievementType: Achievement_Type;
  readonly achievement_type: Achievement_Type_Enum;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['Int'];
  readonly level: Scalars['Int'];
  readonly name: Scalars['String'];
  readonly rule: Scalars['json'];
  /** An array relationship */
  readonly user_achievements: ReadonlyArray<User_Achievement>;
  /** An aggregated array relationship */
  readonly user_achievements_aggregate: User_Achievement_Aggregate;
};

/** columns and relationships of "achievement" */
export type AchievementRuleArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "achievement" */
export type AchievementUser_AchievementsArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** columns and relationships of "achievement" */
export type AchievementUser_Achievements_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** aggregated selection of "achievement" */
export type Achievement_Aggregate = {
  readonly __typename: 'achievement_aggregate';
  readonly aggregate?: Maybe<Achievement_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Achievement>;
};

/** aggregate fields of "achievement" */
export type Achievement_Aggregate_Fields = {
  readonly __typename: 'achievement_aggregate_fields';
  readonly avg?: Maybe<Achievement_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Achievement_Max_Fields>;
  readonly min?: Maybe<Achievement_Min_Fields>;
  readonly stddev?: Maybe<Achievement_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Achievement_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Achievement_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Achievement_Sum_Fields>;
  readonly var_pop?: Maybe<Achievement_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Achievement_Var_Samp_Fields>;
  readonly variance?: Maybe<Achievement_Variance_Fields>;
};

/** aggregate fields of "achievement" */
export type Achievement_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "achievement" */
export type Achievement_Aggregate_Order_By = {
  readonly avg?: Maybe<Achievement_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Achievement_Max_Order_By>;
  readonly min?: Maybe<Achievement_Min_Order_By>;
  readonly stddev?: Maybe<Achievement_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Achievement_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Achievement_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Achievement_Sum_Order_By>;
  readonly var_pop?: Maybe<Achievement_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Achievement_Var_Samp_Order_By>;
  readonly variance?: Maybe<Achievement_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "achievement" */
export type Achievement_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Achievement_Insert_Input>;
  readonly on_conflict?: Maybe<Achievement_On_Conflict>;
};

/** aggregate avg on columns */
export type Achievement_Avg_Fields = {
  readonly __typename: 'achievement_avg_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly level?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "achievement" */
export type Achievement_Avg_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "achievement". All fields are combined with a logical 'AND'. */
export type Achievement_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Achievement_Bool_Exp>>>;
  readonly _not?: Maybe<Achievement_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Achievement_Bool_Exp>>>;
  readonly achievementTypeByAchievementType?: Maybe<Achievement_Type_Bool_Exp>;
  readonly achievement_type?: Maybe<Achievement_Type_Enum_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly description?: Maybe<String_Comparison_Exp>;
  readonly id?: Maybe<Int_Comparison_Exp>;
  readonly level?: Maybe<Int_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly rule?: Maybe<Json_Comparison_Exp>;
  readonly user_achievements?: Maybe<User_Achievement_Bool_Exp>;
};

/** unique or primary key constraints on table "achievement" */
export enum Achievement_Constraint {
  /** unique or primary key constraint */
  AcheivementNameKey = 'Acheivement_name_key',
  /** unique or primary key constraint */
  AcheivementPkey = 'Acheivement_pkey',
}

/** input type for incrementing integer column in table "achievement" */
export type Achievement_Inc_Input = {
  readonly id?: Maybe<Scalars['Int']>;
  readonly level?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "achievement" */
export type Achievement_Insert_Input = {
  readonly achievementTypeByAchievementType?: Maybe<Achievement_Type_Obj_Rel_Insert_Input>;
  readonly achievement_type?: Maybe<Achievement_Type_Enum>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly level?: Maybe<Scalars['Int']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly rule?: Maybe<Scalars['json']>;
  readonly user_achievements?: Maybe<User_Achievement_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Achievement_Max_Fields = {
  readonly __typename: 'achievement_max_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly level?: Maybe<Scalars['Int']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "achievement" */
export type Achievement_Max_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly description?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Achievement_Min_Fields = {
  readonly __typename: 'achievement_min_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly level?: Maybe<Scalars['Int']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "achievement" */
export type Achievement_Min_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly description?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** response of any mutation on the table "achievement" */
export type Achievement_Mutation_Response = {
  readonly __typename: 'achievement_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Achievement>;
};

/** input type for inserting object relation for remote table "achievement" */
export type Achievement_Obj_Rel_Insert_Input = {
  readonly data: Achievement_Insert_Input;
  readonly on_conflict?: Maybe<Achievement_On_Conflict>;
};

/** on conflict condition type for table "achievement" */
export type Achievement_On_Conflict = {
  readonly constraint: Achievement_Constraint;
  readonly update_columns: ReadonlyArray<Achievement_Update_Column>;
  readonly where?: Maybe<Achievement_Bool_Exp>;
};

/** ordering options when selecting data from "achievement" */
export type Achievement_Order_By = {
  readonly achievementTypeByAchievementType?: Maybe<Achievement_Type_Order_By>;
  readonly achievement_type?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly description?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly rule?: Maybe<Order_By>;
  readonly user_achievements_aggregate?: Maybe<User_Achievement_Aggregate_Order_By>;
};

/** primary key columns input for table: "achievement" */
export type Achievement_Pk_Columns_Input = {
  readonly id: Scalars['Int'];
};

/** select columns of table "achievement" */
export enum Achievement_Select_Column {
  /** column name */
  AchievementType = 'achievement_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  Name = 'name',
  /** column name */
  Rule = 'rule',
}

/** input type for updating data in table "achievement" */
export type Achievement_Set_Input = {
  readonly achievement_type?: Maybe<Achievement_Type_Enum>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly level?: Maybe<Scalars['Int']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly rule?: Maybe<Scalars['json']>;
};

/** aggregate stddev on columns */
export type Achievement_Stddev_Fields = {
  readonly __typename: 'achievement_stddev_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly level?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "achievement" */
export type Achievement_Stddev_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Achievement_Stddev_Pop_Fields = {
  readonly __typename: 'achievement_stddev_pop_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly level?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "achievement" */
export type Achievement_Stddev_Pop_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Achievement_Stddev_Samp_Fields = {
  readonly __typename: 'achievement_stddev_samp_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly level?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "achievement" */
export type Achievement_Stddev_Samp_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Achievement_Sum_Fields = {
  readonly __typename: 'achievement_sum_fields';
  readonly id?: Maybe<Scalars['Int']>;
  readonly level?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "achievement" */
export type Achievement_Sum_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
};

/** columns and relationships of "achievement_type" */
export type Achievement_Type = {
  readonly __typename: 'achievement_type';
  /** An array relationship */
  readonly achievements: ReadonlyArray<Achievement>;
  /** An aggregated array relationship */
  readonly achievements_aggregate: Achievement_Aggregate;
  readonly description?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
};

/** columns and relationships of "achievement_type" */
export type Achievement_TypeAchievementsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** columns and relationships of "achievement_type" */
export type Achievement_TypeAchievements_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** aggregated selection of "achievement_type" */
export type Achievement_Type_Aggregate = {
  readonly __typename: 'achievement_type_aggregate';
  readonly aggregate?: Maybe<Achievement_Type_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Achievement_Type>;
};

/** aggregate fields of "achievement_type" */
export type Achievement_Type_Aggregate_Fields = {
  readonly __typename: 'achievement_type_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Achievement_Type_Max_Fields>;
  readonly min?: Maybe<Achievement_Type_Min_Fields>;
};

/** aggregate fields of "achievement_type" */
export type Achievement_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Achievement_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "achievement_type" */
export type Achievement_Type_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Achievement_Type_Max_Order_By>;
  readonly min?: Maybe<Achievement_Type_Min_Order_By>;
};

/** input type for inserting array relation for remote table "achievement_type" */
export type Achievement_Type_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Achievement_Type_Insert_Input>;
  readonly on_conflict?: Maybe<Achievement_Type_On_Conflict>;
};

/** Boolean expression to filter rows from the table "achievement_type". All fields are combined with a logical 'AND'. */
export type Achievement_Type_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Achievement_Type_Bool_Exp>>>;
  readonly _not?: Maybe<Achievement_Type_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Achievement_Type_Bool_Exp>>>;
  readonly achievements?: Maybe<Achievement_Bool_Exp>;
  readonly description?: Maybe<String_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "achievement_type" */
export enum Achievement_Type_Constraint {
  /** unique or primary key constraint */
  AchievementTypePkey = 'achievement_type_pkey',
}

export enum Achievement_Type_Enum {
  /** First activity on the app */
  FirstActivity = 'FIRST_ACTIVITY',
  Score = 'SCORE',
  ScoreInCategory = 'SCORE_IN_CATEGORY',
}

/** expression to compare columns of type achievement_type_enum. All fields are combined with logical 'AND'. */
export type Achievement_Type_Enum_Comparison_Exp = {
  readonly _eq?: Maybe<Achievement_Type_Enum>;
  readonly _in?: Maybe<ReadonlyArray<Achievement_Type_Enum>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _neq?: Maybe<Achievement_Type_Enum>;
  readonly _nin?: Maybe<ReadonlyArray<Achievement_Type_Enum>>;
};

/** input type for inserting data into table "achievement_type" */
export type Achievement_Type_Insert_Input = {
  readonly achievements?: Maybe<Achievement_Arr_Rel_Insert_Input>;
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Achievement_Type_Max_Fields = {
  readonly __typename: 'achievement_type_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "achievement_type" */
export type Achievement_Type_Max_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Achievement_Type_Min_Fields = {
  readonly __typename: 'achievement_type_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "achievement_type" */
export type Achievement_Type_Min_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** response of any mutation on the table "achievement_type" */
export type Achievement_Type_Mutation_Response = {
  readonly __typename: 'achievement_type_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Achievement_Type>;
};

/** input type for inserting object relation for remote table "achievement_type" */
export type Achievement_Type_Obj_Rel_Insert_Input = {
  readonly data: Achievement_Type_Insert_Input;
  readonly on_conflict?: Maybe<Achievement_Type_On_Conflict>;
};

/** on conflict condition type for table "achievement_type" */
export type Achievement_Type_On_Conflict = {
  readonly constraint: Achievement_Type_Constraint;
  readonly update_columns: ReadonlyArray<Achievement_Type_Update_Column>;
  readonly where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** ordering options when selecting data from "achievement_type" */
export type Achievement_Type_Order_By = {
  readonly achievements_aggregate?: Maybe<Achievement_Aggregate_Order_By>;
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** primary key columns input for table: "achievement_type" */
export type Achievement_Type_Pk_Columns_Input = {
  readonly name: Scalars['String'];
};

/** select columns of table "achievement_type" */
export enum Achievement_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "achievement_type" */
export type Achievement_Type_Set_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** update columns of table "achievement_type" */
export enum Achievement_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
}

/** update columns of table "achievement" */
export enum Achievement_Update_Column {
  /** column name */
  AchievementType = 'achievement_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  Name = 'name',
  /** column name */
  Rule = 'rule',
}

/** aggregate var_pop on columns */
export type Achievement_Var_Pop_Fields = {
  readonly __typename: 'achievement_var_pop_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly level?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "achievement" */
export type Achievement_Var_Pop_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Achievement_Var_Samp_Fields = {
  readonly __typename: 'achievement_var_samp_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly level?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "achievement" */
export type Achievement_Var_Samp_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Achievement_Variance_Fields = {
  readonly __typename: 'achievement_variance_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly level?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "achievement" */
export type Achievement_Variance_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly level?: Maybe<Order_By>;
};

/** columns and relationships of "activities" */
export type Activities = {
  readonly __typename: 'activities';
  readonly activity_id: Scalars['Int'];
  readonly caption?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly comments: ReadonlyArray<Comments>;
  /** An aggregated array relationship */
  readonly comments_aggregate: Comments_Aggregate;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly duration: Scalars['interval'];
  /** An object relationship */
  readonly geofence: Geofences;
  readonly geofence_id: Scalars['Int'];
  /** An array relationship */
  readonly likes: ReadonlyArray<Likes>;
  /** An aggregated array relationship */
  readonly likes_aggregate: Likes_Aggregate;
  readonly score?: Maybe<Scalars['Int']>;
  readonly started_at: Scalars['timestamptz'];
  /** A computed field, executes function "stopped_at" */
  readonly stopped_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  readonly user: Users;
  readonly user_id: Scalars['String'];
};

/** columns and relationships of "activities" */
export type ActivitiesCommentsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** columns and relationships of "activities" */
export type ActivitiesComments_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** columns and relationships of "activities" */
export type ActivitiesLikesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** columns and relationships of "activities" */
export type ActivitiesLikes_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** aggregated selection of "activities" */
export type Activities_Aggregate = {
  readonly __typename: 'activities_aggregate';
  readonly aggregate?: Maybe<Activities_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Activities>;
};

/** aggregate fields of "activities" */
export type Activities_Aggregate_Fields = {
  readonly __typename: 'activities_aggregate_fields';
  readonly avg?: Maybe<Activities_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Activities_Max_Fields>;
  readonly min?: Maybe<Activities_Min_Fields>;
  readonly stddev?: Maybe<Activities_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Activities_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Activities_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Activities_Sum_Fields>;
  readonly var_pop?: Maybe<Activities_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Activities_Var_Samp_Fields>;
  readonly variance?: Maybe<Activities_Variance_Fields>;
};

/** aggregate fields of "activities" */
export type Activities_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "activities" */
export type Activities_Aggregate_Order_By = {
  readonly avg?: Maybe<Activities_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Activities_Max_Order_By>;
  readonly min?: Maybe<Activities_Min_Order_By>;
  readonly stddev?: Maybe<Activities_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Activities_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Activities_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Activities_Sum_Order_By>;
  readonly var_pop?: Maybe<Activities_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Activities_Var_Samp_Order_By>;
  readonly variance?: Maybe<Activities_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "activities" */
export type Activities_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Activities_Insert_Input>;
  readonly on_conflict?: Maybe<Activities_On_Conflict>;
};

/** aggregate avg on columns */
export type Activities_Avg_Fields = {
  readonly __typename: 'activities_avg_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
  readonly score?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "activities" */
export type Activities_Avg_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "activities". All fields are combined with a logical 'AND'. */
export type Activities_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Activities_Bool_Exp>>>;
  readonly _not?: Maybe<Activities_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Activities_Bool_Exp>>>;
  readonly activity_id?: Maybe<Int_Comparison_Exp>;
  readonly caption?: Maybe<String_Comparison_Exp>;
  readonly comments?: Maybe<Comments_Bool_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly duration?: Maybe<Interval_Comparison_Exp>;
  readonly geofence?: Maybe<Geofences_Bool_Exp>;
  readonly geofence_id?: Maybe<Int_Comparison_Exp>;
  readonly likes?: Maybe<Likes_Bool_Exp>;
  readonly score?: Maybe<Int_Comparison_Exp>;
  readonly started_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "activities" */
export enum Activities_Constraint {
  /** unique or primary key constraint */
  ActivityPkey = 'Activity_pkey',
}

/** input type for incrementing integer column in table "activities" */
export type Activities_Inc_Input = {
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
  readonly score?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "activities" */
export type Activities_Insert_Input = {
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly caption?: Maybe<Scalars['String']>;
  readonly comments?: Maybe<Comments_Arr_Rel_Insert_Input>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly duration?: Maybe<Scalars['interval']>;
  readonly geofence?: Maybe<Geofences_Obj_Rel_Insert_Input>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
  readonly likes?: Maybe<Likes_Arr_Rel_Insert_Input>;
  readonly score?: Maybe<Scalars['Int']>;
  readonly started_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Activities_Max_Fields = {
  readonly __typename: 'activities_max_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly caption?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
  readonly score?: Maybe<Scalars['Int']>;
  readonly started_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "activities" */
export type Activities_Max_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly caption?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
  readonly started_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Activities_Min_Fields = {
  readonly __typename: 'activities_min_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly caption?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
  readonly score?: Maybe<Scalars['Int']>;
  readonly started_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "activities" */
export type Activities_Min_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly caption?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
  readonly started_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "activities" */
export type Activities_Mutation_Response = {
  readonly __typename: 'activities_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Activities>;
};

/** input type for inserting object relation for remote table "activities" */
export type Activities_Obj_Rel_Insert_Input = {
  readonly data: Activities_Insert_Input;
  readonly on_conflict?: Maybe<Activities_On_Conflict>;
};

/** on conflict condition type for table "activities" */
export type Activities_On_Conflict = {
  readonly constraint: Activities_Constraint;
  readonly update_columns: ReadonlyArray<Activities_Update_Column>;
  readonly where?: Maybe<Activities_Bool_Exp>;
};

/** ordering options when selecting data from "activities" */
export type Activities_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly caption?: Maybe<Order_By>;
  readonly comments_aggregate?: Maybe<Comments_Aggregate_Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly duration?: Maybe<Order_By>;
  readonly geofence?: Maybe<Geofences_Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly likes_aggregate?: Maybe<Likes_Aggregate_Order_By>;
  readonly score?: Maybe<Order_By>;
  readonly started_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "activities" */
export type Activities_Pk_Columns_Input = {
  readonly activity_id: Scalars['Int'];
};

/** select columns of table "activities" */
export enum Activities_Select_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  Caption = 'caption',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Duration = 'duration',
  /** column name */
  GeofenceId = 'geofence_id',
  /** column name */
  Score = 'score',
  /** column name */
  StartedAt = 'started_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "activities" */
export type Activities_Set_Input = {
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly caption?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly duration?: Maybe<Scalars['interval']>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
  readonly score?: Maybe<Scalars['Int']>;
  readonly started_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Activities_Stddev_Fields = {
  readonly __typename: 'activities_stddev_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
  readonly score?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "activities" */
export type Activities_Stddev_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Activities_Stddev_Pop_Fields = {
  readonly __typename: 'activities_stddev_pop_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
  readonly score?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "activities" */
export type Activities_Stddev_Pop_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Activities_Stddev_Samp_Fields = {
  readonly __typename: 'activities_stddev_samp_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
  readonly score?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "activities" */
export type Activities_Stddev_Samp_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Activities_Sum_Fields = {
  readonly __typename: 'activities_sum_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
  readonly score?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "activities" */
export type Activities_Sum_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
};

/** update columns of table "activities" */
export enum Activities_Update_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  Caption = 'caption',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Duration = 'duration',
  /** column name */
  GeofenceId = 'geofence_id',
  /** column name */
  Score = 'score',
  /** column name */
  StartedAt = 'started_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Activities_Var_Pop_Fields = {
  readonly __typename: 'activities_var_pop_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
  readonly score?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "activities" */
export type Activities_Var_Pop_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Activities_Var_Samp_Fields = {
  readonly __typename: 'activities_var_samp_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
  readonly score?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "activities" */
export type Activities_Var_Samp_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Activities_Variance_Fields = {
  readonly __typename: 'activities_variance_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
  readonly score?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "activities" */
export type Activities_Variance_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly score?: Maybe<Order_By>;
};

/** columns and relationships of "categories" */
export type Categories = {
  readonly __typename: 'categories';
  readonly description?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly points_per_minute: Scalars['Int'];
};

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  readonly __typename: 'categories_aggregate';
  readonly aggregate?: Maybe<Categories_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Categories>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  readonly __typename: 'categories_aggregate_fields';
  readonly avg?: Maybe<Categories_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Categories_Max_Fields>;
  readonly min?: Maybe<Categories_Min_Fields>;
  readonly stddev?: Maybe<Categories_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Categories_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Categories_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Categories_Sum_Fields>;
  readonly var_pop?: Maybe<Categories_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Categories_Var_Samp_Fields>;
  readonly variance?: Maybe<Categories_Variance_Fields>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Categories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "categories" */
export type Categories_Aggregate_Order_By = {
  readonly avg?: Maybe<Categories_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Categories_Max_Order_By>;
  readonly min?: Maybe<Categories_Min_Order_By>;
  readonly stddev?: Maybe<Categories_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Categories_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Categories_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Categories_Sum_Order_By>;
  readonly var_pop?: Maybe<Categories_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Categories_Var_Samp_Order_By>;
  readonly variance?: Maybe<Categories_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "categories" */
export type Categories_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Categories_Insert_Input>;
  readonly on_conflict?: Maybe<Categories_On_Conflict>;
};

/** aggregate avg on columns */
export type Categories_Avg_Fields = {
  readonly __typename: 'categories_avg_fields';
  readonly points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "categories" */
export type Categories_Avg_Order_By = {
  readonly points_per_minute?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Categories_Bool_Exp>>>;
  readonly _not?: Maybe<Categories_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Categories_Bool_Exp>>>;
  readonly description?: Maybe<String_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly points_per_minute?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint */
  CategoryNameKey = 'Category_name_key',
  /** unique or primary key constraint */
  CategoriesPkey = 'categories_pkey',
}

/** input type for incrementing integer column in table "categories" */
export type Categories_Inc_Input = {
  readonly points_per_minute?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly points_per_minute?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  readonly __typename: 'categories_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly points_per_minute?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "categories" */
export type Categories_Max_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly points_per_minute?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  readonly __typename: 'categories_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly points_per_minute?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "categories" */
export type Categories_Min_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly points_per_minute?: Maybe<Order_By>;
};

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  readonly __typename: 'categories_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Categories>;
};

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  readonly data: Categories_Insert_Input;
  readonly on_conflict?: Maybe<Categories_On_Conflict>;
};

/** on conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  readonly constraint: Categories_Constraint;
  readonly update_columns: ReadonlyArray<Categories_Update_Column>;
  readonly where?: Maybe<Categories_Bool_Exp>;
};

/** ordering options when selecting data from "categories" */
export type Categories_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly points_per_minute?: Maybe<Order_By>;
};

/** primary key columns input for table: "categories" */
export type Categories_Pk_Columns_Input = {
  readonly name: Scalars['String'];
};

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
  /** column name */
  PointsPerMinute = 'points_per_minute',
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly points_per_minute?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Categories_Stddev_Fields = {
  readonly __typename: 'categories_stddev_fields';
  readonly points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "categories" */
export type Categories_Stddev_Order_By = {
  readonly points_per_minute?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Categories_Stddev_Pop_Fields = {
  readonly __typename: 'categories_stddev_pop_fields';
  readonly points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "categories" */
export type Categories_Stddev_Pop_Order_By = {
  readonly points_per_minute?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Categories_Stddev_Samp_Fields = {
  readonly __typename: 'categories_stddev_samp_fields';
  readonly points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "categories" */
export type Categories_Stddev_Samp_Order_By = {
  readonly points_per_minute?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Categories_Sum_Fields = {
  readonly __typename: 'categories_sum_fields';
  readonly points_per_minute?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "categories" */
export type Categories_Sum_Order_By = {
  readonly points_per_minute?: Maybe<Order_By>;
};

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
  /** column name */
  PointsPerMinute = 'points_per_minute',
}

/** aggregate var_pop on columns */
export type Categories_Var_Pop_Fields = {
  readonly __typename: 'categories_var_pop_fields';
  readonly points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "categories" */
export type Categories_Var_Pop_Order_By = {
  readonly points_per_minute?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Categories_Var_Samp_Fields = {
  readonly __typename: 'categories_var_samp_fields';
  readonly points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "categories" */
export type Categories_Var_Samp_Order_By = {
  readonly points_per_minute?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Categories_Variance_Fields = {
  readonly __typename: 'categories_variance_fields';
  readonly points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "categories" */
export type Categories_Variance_Order_By = {
  readonly points_per_minute?: Maybe<Order_By>;
};

/** columns and relationships of "challenge" */
export type Challenge = {
  readonly __typename: 'challenge';
  /** An object relationship */
  readonly challengeTypeByChallengeType: Challenge_Type;
  readonly challenge_type: Challenge_Type_Enum;
  readonly created_at: Scalars['timestamptz'];
  readonly daterange?: Maybe<Scalars['daterange']>;
  readonly id: Scalars['Int'];
  readonly is_active: Scalars['Boolean'];
  readonly rules?: Maybe<Scalars['json']>;
};

/** columns and relationships of "challenge" */
export type ChallengeRulesArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "challenge" */
export type Challenge_Aggregate = {
  readonly __typename: 'challenge_aggregate';
  readonly aggregate?: Maybe<Challenge_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Challenge>;
};

/** aggregate fields of "challenge" */
export type Challenge_Aggregate_Fields = {
  readonly __typename: 'challenge_aggregate_fields';
  readonly avg?: Maybe<Challenge_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Challenge_Max_Fields>;
  readonly min?: Maybe<Challenge_Min_Fields>;
  readonly stddev?: Maybe<Challenge_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Challenge_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Challenge_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Challenge_Sum_Fields>;
  readonly var_pop?: Maybe<Challenge_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Challenge_Var_Samp_Fields>;
  readonly variance?: Maybe<Challenge_Variance_Fields>;
};

/** aggregate fields of "challenge" */
export type Challenge_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Challenge_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "challenge" */
export type Challenge_Aggregate_Order_By = {
  readonly avg?: Maybe<Challenge_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Challenge_Max_Order_By>;
  readonly min?: Maybe<Challenge_Min_Order_By>;
  readonly stddev?: Maybe<Challenge_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Challenge_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Challenge_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Challenge_Sum_Order_By>;
  readonly var_pop?: Maybe<Challenge_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Challenge_Var_Samp_Order_By>;
  readonly variance?: Maybe<Challenge_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "challenge" */
export type Challenge_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Challenge_Insert_Input>;
  readonly on_conflict?: Maybe<Challenge_On_Conflict>;
};

/** aggregate avg on columns */
export type Challenge_Avg_Fields = {
  readonly __typename: 'challenge_avg_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "challenge" */
export type Challenge_Avg_Order_By = {
  readonly id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "challenge". All fields are combined with a logical 'AND'. */
export type Challenge_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Challenge_Bool_Exp>>>;
  readonly _not?: Maybe<Challenge_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Challenge_Bool_Exp>>>;
  readonly challengeTypeByChallengeType?: Maybe<Challenge_Type_Bool_Exp>;
  readonly challenge_type?: Maybe<Challenge_Type_Enum_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly daterange?: Maybe<Daterange_Comparison_Exp>;
  readonly id?: Maybe<Int_Comparison_Exp>;
  readonly is_active?: Maybe<Boolean_Comparison_Exp>;
  readonly rules?: Maybe<Json_Comparison_Exp>;
};

/** unique or primary key constraints on table "challenge" */
export enum Challenge_Constraint {
  /** unique or primary key constraint */
  UserChallengePkey = 'user_challenge_pkey',
}

/** input type for incrementing integer column in table "challenge" */
export type Challenge_Inc_Input = {
  readonly id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "challenge" */
export type Challenge_Insert_Input = {
  readonly challengeTypeByChallengeType?: Maybe<Challenge_Type_Obj_Rel_Insert_Input>;
  readonly challenge_type?: Maybe<Challenge_Type_Enum>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly daterange?: Maybe<Scalars['daterange']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly is_active?: Maybe<Scalars['Boolean']>;
  readonly rules?: Maybe<Scalars['json']>;
};

/** aggregate max on columns */
export type Challenge_Max_Fields = {
  readonly __typename: 'challenge_max_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "challenge" */
export type Challenge_Max_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Challenge_Min_Fields = {
  readonly __typename: 'challenge_min_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "challenge" */
export type Challenge_Min_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
};

/** response of any mutation on the table "challenge" */
export type Challenge_Mutation_Response = {
  readonly __typename: 'challenge_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Challenge>;
};

/** input type for inserting object relation for remote table "challenge" */
export type Challenge_Obj_Rel_Insert_Input = {
  readonly data: Challenge_Insert_Input;
  readonly on_conflict?: Maybe<Challenge_On_Conflict>;
};

/** on conflict condition type for table "challenge" */
export type Challenge_On_Conflict = {
  readonly constraint: Challenge_Constraint;
  readonly update_columns: ReadonlyArray<Challenge_Update_Column>;
  readonly where?: Maybe<Challenge_Bool_Exp>;
};

/** ordering options when selecting data from "challenge" */
export type Challenge_Order_By = {
  readonly challengeTypeByChallengeType?: Maybe<Challenge_Type_Order_By>;
  readonly challenge_type?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly daterange?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly is_active?: Maybe<Order_By>;
  readonly rules?: Maybe<Order_By>;
};

/** columns and relationships of "challenge_participant" */
export type Challenge_Participant = {
  readonly __typename: 'challenge_participant';
  readonly challenge_id: Scalars['Int'];
  readonly user_id: Scalars['String'];
};

/** aggregated selection of "challenge_participant" */
export type Challenge_Participant_Aggregate = {
  readonly __typename: 'challenge_participant_aggregate';
  readonly aggregate?: Maybe<Challenge_Participant_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Challenge_Participant>;
};

/** aggregate fields of "challenge_participant" */
export type Challenge_Participant_Aggregate_Fields = {
  readonly __typename: 'challenge_participant_aggregate_fields';
  readonly avg?: Maybe<Challenge_Participant_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Challenge_Participant_Max_Fields>;
  readonly min?: Maybe<Challenge_Participant_Min_Fields>;
  readonly stddev?: Maybe<Challenge_Participant_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Challenge_Participant_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Challenge_Participant_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Challenge_Participant_Sum_Fields>;
  readonly var_pop?: Maybe<Challenge_Participant_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Challenge_Participant_Var_Samp_Fields>;
  readonly variance?: Maybe<Challenge_Participant_Variance_Fields>;
};

/** aggregate fields of "challenge_participant" */
export type Challenge_Participant_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Challenge_Participant_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "challenge_participant" */
export type Challenge_Participant_Aggregate_Order_By = {
  readonly avg?: Maybe<Challenge_Participant_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Challenge_Participant_Max_Order_By>;
  readonly min?: Maybe<Challenge_Participant_Min_Order_By>;
  readonly stddev?: Maybe<Challenge_Participant_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Challenge_Participant_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Challenge_Participant_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Challenge_Participant_Sum_Order_By>;
  readonly var_pop?: Maybe<Challenge_Participant_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Challenge_Participant_Var_Samp_Order_By>;
  readonly variance?: Maybe<Challenge_Participant_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "challenge_participant" */
export type Challenge_Participant_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Challenge_Participant_Insert_Input>;
  readonly on_conflict?: Maybe<Challenge_Participant_On_Conflict>;
};

/** aggregate avg on columns */
export type Challenge_Participant_Avg_Fields = {
  readonly __typename: 'challenge_participant_avg_fields';
  readonly challenge_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "challenge_participant" */
export type Challenge_Participant_Avg_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "challenge_participant". All fields are combined with a logical 'AND'. */
export type Challenge_Participant_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Challenge_Participant_Bool_Exp>>>;
  readonly _not?: Maybe<Challenge_Participant_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Challenge_Participant_Bool_Exp>>>;
  readonly challenge_id?: Maybe<Int_Comparison_Exp>;
  readonly user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "challenge_participant" */
export enum Challenge_Participant_Constraint {
  /** unique or primary key constraint */
  ChallengeParticipantsPkey = 'challenge_participants_pkey',
}

/** input type for incrementing integer column in table "challenge_participant" */
export type Challenge_Participant_Inc_Input = {
  readonly challenge_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "challenge_participant" */
export type Challenge_Participant_Insert_Input = {
  readonly challenge_id?: Maybe<Scalars['Int']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Challenge_Participant_Max_Fields = {
  readonly __typename: 'challenge_participant_max_fields';
  readonly challenge_id?: Maybe<Scalars['Int']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "challenge_participant" */
export type Challenge_Participant_Max_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Challenge_Participant_Min_Fields = {
  readonly __typename: 'challenge_participant_min_fields';
  readonly challenge_id?: Maybe<Scalars['Int']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "challenge_participant" */
export type Challenge_Participant_Min_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "challenge_participant" */
export type Challenge_Participant_Mutation_Response = {
  readonly __typename: 'challenge_participant_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Challenge_Participant>;
};

/** input type for inserting object relation for remote table "challenge_participant" */
export type Challenge_Participant_Obj_Rel_Insert_Input = {
  readonly data: Challenge_Participant_Insert_Input;
  readonly on_conflict?: Maybe<Challenge_Participant_On_Conflict>;
};

/** on conflict condition type for table "challenge_participant" */
export type Challenge_Participant_On_Conflict = {
  readonly constraint: Challenge_Participant_Constraint;
  readonly update_columns: ReadonlyArray<Challenge_Participant_Update_Column>;
  readonly where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** ordering options when selecting data from "challenge_participant" */
export type Challenge_Participant_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "challenge_participant" */
export type Challenge_Participant_Pk_Columns_Input = {
  readonly challenge_id: Scalars['Int'];
  readonly user_id: Scalars['String'];
};

/** select columns of table "challenge_participant" */
export enum Challenge_Participant_Select_Column {
  /** column name */
  ChallengeId = 'challenge_id',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "challenge_participant" */
export type Challenge_Participant_Set_Input = {
  readonly challenge_id?: Maybe<Scalars['Int']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Challenge_Participant_Stddev_Fields = {
  readonly __typename: 'challenge_participant_stddev_fields';
  readonly challenge_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "challenge_participant" */
export type Challenge_Participant_Stddev_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Challenge_Participant_Stddev_Pop_Fields = {
  readonly __typename: 'challenge_participant_stddev_pop_fields';
  readonly challenge_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "challenge_participant" */
export type Challenge_Participant_Stddev_Pop_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Challenge_Participant_Stddev_Samp_Fields = {
  readonly __typename: 'challenge_participant_stddev_samp_fields';
  readonly challenge_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "challenge_participant" */
export type Challenge_Participant_Stddev_Samp_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Challenge_Participant_Sum_Fields = {
  readonly __typename: 'challenge_participant_sum_fields';
  readonly challenge_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "challenge_participant" */
export type Challenge_Participant_Sum_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
};

/** update columns of table "challenge_participant" */
export enum Challenge_Participant_Update_Column {
  /** column name */
  ChallengeId = 'challenge_id',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Challenge_Participant_Var_Pop_Fields = {
  readonly __typename: 'challenge_participant_var_pop_fields';
  readonly challenge_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "challenge_participant" */
export type Challenge_Participant_Var_Pop_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Challenge_Participant_Var_Samp_Fields = {
  readonly __typename: 'challenge_participant_var_samp_fields';
  readonly challenge_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "challenge_participant" */
export type Challenge_Participant_Var_Samp_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Challenge_Participant_Variance_Fields = {
  readonly __typename: 'challenge_participant_variance_fields';
  readonly challenge_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "challenge_participant" */
export type Challenge_Participant_Variance_Order_By = {
  readonly challenge_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "challenge" */
export type Challenge_Pk_Columns_Input = {
  readonly id: Scalars['Int'];
};

/** select columns of table "challenge" */
export enum Challenge_Select_Column {
  /** column name */
  ChallengeType = 'challenge_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Daterange = 'daterange',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Rules = 'rules',
}

/** input type for updating data in table "challenge" */
export type Challenge_Set_Input = {
  readonly challenge_type?: Maybe<Challenge_Type_Enum>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly daterange?: Maybe<Scalars['daterange']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly is_active?: Maybe<Scalars['Boolean']>;
  readonly rules?: Maybe<Scalars['json']>;
};

/** aggregate stddev on columns */
export type Challenge_Stddev_Fields = {
  readonly __typename: 'challenge_stddev_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "challenge" */
export type Challenge_Stddev_Order_By = {
  readonly id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Challenge_Stddev_Pop_Fields = {
  readonly __typename: 'challenge_stddev_pop_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "challenge" */
export type Challenge_Stddev_Pop_Order_By = {
  readonly id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Challenge_Stddev_Samp_Fields = {
  readonly __typename: 'challenge_stddev_samp_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "challenge" */
export type Challenge_Stddev_Samp_Order_By = {
  readonly id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Challenge_Sum_Fields = {
  readonly __typename: 'challenge_sum_fields';
  readonly id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "challenge" */
export type Challenge_Sum_Order_By = {
  readonly id?: Maybe<Order_By>;
};

/** columns and relationships of "challenge_type" */
export type Challenge_Type = {
  readonly __typename: 'challenge_type';
  readonly description?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
};

/** aggregated selection of "challenge_type" */
export type Challenge_Type_Aggregate = {
  readonly __typename: 'challenge_type_aggregate';
  readonly aggregate?: Maybe<Challenge_Type_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Challenge_Type>;
};

/** aggregate fields of "challenge_type" */
export type Challenge_Type_Aggregate_Fields = {
  readonly __typename: 'challenge_type_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Challenge_Type_Max_Fields>;
  readonly min?: Maybe<Challenge_Type_Min_Fields>;
};

/** aggregate fields of "challenge_type" */
export type Challenge_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Challenge_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "challenge_type" */
export type Challenge_Type_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Challenge_Type_Max_Order_By>;
  readonly min?: Maybe<Challenge_Type_Min_Order_By>;
};

/** input type for inserting array relation for remote table "challenge_type" */
export type Challenge_Type_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Challenge_Type_Insert_Input>;
  readonly on_conflict?: Maybe<Challenge_Type_On_Conflict>;
};

/** Boolean expression to filter rows from the table "challenge_type". All fields are combined with a logical 'AND'. */
export type Challenge_Type_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Challenge_Type_Bool_Exp>>>;
  readonly _not?: Maybe<Challenge_Type_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Challenge_Type_Bool_Exp>>>;
  readonly description?: Maybe<String_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "challenge_type" */
export enum Challenge_Type_Constraint {
  /** unique or primary key constraint */
  ChallengeTypeDescriptionKey = 'challenge_type_description_key',
  /** unique or primary key constraint */
  ChallengeTypePkey = 'challenge_type_pkey',
}

export enum Challenge_Type_Enum {
  Score = 'SCORE',
}

/** expression to compare columns of type challenge_type_enum. All fields are combined with logical 'AND'. */
export type Challenge_Type_Enum_Comparison_Exp = {
  readonly _eq?: Maybe<Challenge_Type_Enum>;
  readonly _in?: Maybe<ReadonlyArray<Challenge_Type_Enum>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _neq?: Maybe<Challenge_Type_Enum>;
  readonly _nin?: Maybe<ReadonlyArray<Challenge_Type_Enum>>;
};

/** input type for inserting data into table "challenge_type" */
export type Challenge_Type_Insert_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Challenge_Type_Max_Fields = {
  readonly __typename: 'challenge_type_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "challenge_type" */
export type Challenge_Type_Max_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Challenge_Type_Min_Fields = {
  readonly __typename: 'challenge_type_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "challenge_type" */
export type Challenge_Type_Min_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** response of any mutation on the table "challenge_type" */
export type Challenge_Type_Mutation_Response = {
  readonly __typename: 'challenge_type_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Challenge_Type>;
};

/** input type for inserting object relation for remote table "challenge_type" */
export type Challenge_Type_Obj_Rel_Insert_Input = {
  readonly data: Challenge_Type_Insert_Input;
  readonly on_conflict?: Maybe<Challenge_Type_On_Conflict>;
};

/** on conflict condition type for table "challenge_type" */
export type Challenge_Type_On_Conflict = {
  readonly constraint: Challenge_Type_Constraint;
  readonly update_columns: ReadonlyArray<Challenge_Type_Update_Column>;
  readonly where?: Maybe<Challenge_Type_Bool_Exp>;
};

/** ordering options when selecting data from "challenge_type" */
export type Challenge_Type_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** primary key columns input for table: "challenge_type" */
export type Challenge_Type_Pk_Columns_Input = {
  readonly name: Scalars['String'];
};

/** select columns of table "challenge_type" */
export enum Challenge_Type_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "challenge_type" */
export type Challenge_Type_Set_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** update columns of table "challenge_type" */
export enum Challenge_Type_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
}

/** update columns of table "challenge" */
export enum Challenge_Update_Column {
  /** column name */
  ChallengeType = 'challenge_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Daterange = 'daterange',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Rules = 'rules',
}

/** aggregate var_pop on columns */
export type Challenge_Var_Pop_Fields = {
  readonly __typename: 'challenge_var_pop_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "challenge" */
export type Challenge_Var_Pop_Order_By = {
  readonly id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Challenge_Var_Samp_Fields = {
  readonly __typename: 'challenge_var_samp_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "challenge" */
export type Challenge_Var_Samp_Order_By = {
  readonly id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Challenge_Variance_Fields = {
  readonly __typename: 'challenge_variance_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "challenge" */
export type Challenge_Variance_Order_By = {
  readonly id?: Maybe<Order_By>;
};

/** columns and relationships of "comments" */
export type Comments = {
  readonly __typename: 'comments';
  /** An object relationship */
  readonly activity: Activities;
  readonly activity_id: Scalars['Int'];
  readonly comment_id: Scalars['Int'];
  readonly content: Scalars['String'];
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  readonly user: Users;
  readonly user_id: Scalars['String'];
};

/** aggregated selection of "comments" */
export type Comments_Aggregate = {
  readonly __typename: 'comments_aggregate';
  readonly aggregate?: Maybe<Comments_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Comments>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_Fields = {
  readonly __typename: 'comments_aggregate_fields';
  readonly avg?: Maybe<Comments_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Comments_Max_Fields>;
  readonly min?: Maybe<Comments_Min_Fields>;
  readonly stddev?: Maybe<Comments_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Comments_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Comments_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Comments_Sum_Fields>;
  readonly var_pop?: Maybe<Comments_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Comments_Var_Samp_Fields>;
  readonly variance?: Maybe<Comments_Variance_Fields>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Comments_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "comments" */
export type Comments_Aggregate_Order_By = {
  readonly avg?: Maybe<Comments_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Comments_Max_Order_By>;
  readonly min?: Maybe<Comments_Min_Order_By>;
  readonly stddev?: Maybe<Comments_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Comments_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Comments_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Comments_Sum_Order_By>;
  readonly var_pop?: Maybe<Comments_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Comments_Var_Samp_Order_By>;
  readonly variance?: Maybe<Comments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "comments" */
export type Comments_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Comments_Insert_Input>;
  readonly on_conflict?: Maybe<Comments_On_Conflict>;
};

/** aggregate avg on columns */
export type Comments_Avg_Fields = {
  readonly __typename: 'comments_avg_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly comment_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "comments" */
export type Comments_Avg_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "comments". All fields are combined with a logical 'AND'. */
export type Comments_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Comments_Bool_Exp>>>;
  readonly _not?: Maybe<Comments_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Comments_Bool_Exp>>>;
  readonly activity?: Maybe<Activities_Bool_Exp>;
  readonly activity_id?: Maybe<Int_Comparison_Exp>;
  readonly comment_id?: Maybe<Int_Comparison_Exp>;
  readonly content?: Maybe<String_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamp_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "comments" */
export enum Comments_Constraint {
  /** unique or primary key constraint */
  CommentsPkey = 'Comments_pkey',
}

/** input type for incrementing integer column in table "comments" */
export type Comments_Inc_Input = {
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly comment_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "comments" */
export type Comments_Insert_Input = {
  readonly activity?: Maybe<Activities_Obj_Rel_Insert_Input>;
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly comment_id?: Maybe<Scalars['Int']>;
  readonly content?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Comments_Max_Fields = {
  readonly __typename: 'comments_max_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly comment_id?: Maybe<Scalars['Int']>;
  readonly content?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "comments" */
export type Comments_Max_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
  readonly content?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Comments_Min_Fields = {
  readonly __typename: 'comments_min_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly comment_id?: Maybe<Scalars['Int']>;
  readonly content?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "comments" */
export type Comments_Min_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
  readonly content?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "comments" */
export type Comments_Mutation_Response = {
  readonly __typename: 'comments_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Comments>;
};

/** input type for inserting object relation for remote table "comments" */
export type Comments_Obj_Rel_Insert_Input = {
  readonly data: Comments_Insert_Input;
  readonly on_conflict?: Maybe<Comments_On_Conflict>;
};

/** on conflict condition type for table "comments" */
export type Comments_On_Conflict = {
  readonly constraint: Comments_Constraint;
  readonly update_columns: ReadonlyArray<Comments_Update_Column>;
  readonly where?: Maybe<Comments_Bool_Exp>;
};

/** ordering options when selecting data from "comments" */
export type Comments_Order_By = {
  readonly activity?: Maybe<Activities_Order_By>;
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
  readonly content?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "comments" */
export type Comments_Pk_Columns_Input = {
  readonly comment_id: Scalars['Int'];
};

/** select columns of table "comments" */
export enum Comments_Select_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "comments" */
export type Comments_Set_Input = {
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly comment_id?: Maybe<Scalars['Int']>;
  readonly content?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamp']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Comments_Stddev_Fields = {
  readonly __typename: 'comments_stddev_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly comment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "comments" */
export type Comments_Stddev_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Comments_Stddev_Pop_Fields = {
  readonly __typename: 'comments_stddev_pop_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly comment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "comments" */
export type Comments_Stddev_Pop_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Comments_Stddev_Samp_Fields = {
  readonly __typename: 'comments_stddev_samp_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly comment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "comments" */
export type Comments_Stddev_Samp_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Comments_Sum_Fields = {
  readonly __typename: 'comments_sum_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly comment_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "comments" */
export type Comments_Sum_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
};

/** update columns of table "comments" */
export enum Comments_Update_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  CommentId = 'comment_id',
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Comments_Var_Pop_Fields = {
  readonly __typename: 'comments_var_pop_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly comment_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "comments" */
export type Comments_Var_Pop_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Comments_Var_Samp_Fields = {
  readonly __typename: 'comments_var_samp_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly comment_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "comments" */
export type Comments_Var_Samp_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Comments_Variance_Fields = {
  readonly __typename: 'comments_variance_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly comment_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "comments" */
export type Comments_Variance_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly comment_id?: Maybe<Order_By>;
};

/** expression to compare columns of type daterange. All fields are combined with logical 'AND'. */
export type Daterange_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['daterange']>;
  readonly _gt?: Maybe<Scalars['daterange']>;
  readonly _gte?: Maybe<Scalars['daterange']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['daterange']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['daterange']>;
  readonly _lte?: Maybe<Scalars['daterange']>;
  readonly _neq?: Maybe<Scalars['daterange']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['daterange']>>;
};

/** expression to compare columns of type float8. All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['float8']>;
  readonly _gt?: Maybe<Scalars['float8']>;
  readonly _gte?: Maybe<Scalars['float8']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['float8']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['float8']>;
  readonly _lte?: Maybe<Scalars['float8']>;
  readonly _neq?: Maybe<Scalars['float8']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['float8']>>;
};

/** columns and relationships of "followings" */
export type Followings = {
  readonly __typename: 'followings';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  readonly follower: Users;
  readonly following_id: Scalars['String'];
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  readonly user: Users;
  readonly user_id: Scalars['String'];
};

/** aggregated selection of "followings" */
export type Followings_Aggregate = {
  readonly __typename: 'followings_aggregate';
  readonly aggregate?: Maybe<Followings_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Followings>;
};

/** aggregate fields of "followings" */
export type Followings_Aggregate_Fields = {
  readonly __typename: 'followings_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Followings_Max_Fields>;
  readonly min?: Maybe<Followings_Min_Fields>;
};

/** aggregate fields of "followings" */
export type Followings_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "followings" */
export type Followings_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Followings_Max_Order_By>;
  readonly min?: Maybe<Followings_Min_Order_By>;
};

/** input type for inserting array relation for remote table "followings" */
export type Followings_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Followings_Insert_Input>;
  readonly on_conflict?: Maybe<Followings_On_Conflict>;
};

/** Boolean expression to filter rows from the table "followings". All fields are combined with a logical 'AND'. */
export type Followings_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Followings_Bool_Exp>>>;
  readonly _not?: Maybe<Followings_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Followings_Bool_Exp>>>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly follower?: Maybe<Users_Bool_Exp>;
  readonly following_id?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "followings" */
export enum Followings_Constraint {
  /** unique or primary key constraint */
  FollowingsPkey = 'Followings_pkey',
}

/** input type for inserting data into table "followings" */
export type Followings_Insert_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly follower?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly following_id?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Followings_Max_Fields = {
  readonly __typename: 'followings_max_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly following_id?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "followings" */
export type Followings_Max_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly following_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Followings_Min_Fields = {
  readonly __typename: 'followings_min_fields';
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly following_id?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "followings" */
export type Followings_Min_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly following_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "followings" */
export type Followings_Mutation_Response = {
  readonly __typename: 'followings_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Followings>;
};

/** input type for inserting object relation for remote table "followings" */
export type Followings_Obj_Rel_Insert_Input = {
  readonly data: Followings_Insert_Input;
  readonly on_conflict?: Maybe<Followings_On_Conflict>;
};

/** on conflict condition type for table "followings" */
export type Followings_On_Conflict = {
  readonly constraint: Followings_Constraint;
  readonly update_columns: ReadonlyArray<Followings_Update_Column>;
  readonly where?: Maybe<Followings_Bool_Exp>;
};

/** ordering options when selecting data from "followings" */
export type Followings_Order_By = {
  readonly created_at?: Maybe<Order_By>;
  readonly follower?: Maybe<Users_Order_By>;
  readonly following_id?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "followings" */
export type Followings_Pk_Columns_Input = {
  readonly following_id: Scalars['String'];
  readonly user_id: Scalars['String'];
};

/** select columns of table "followings" */
export enum Followings_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FollowingId = 'following_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "followings" */
export type Followings_Set_Input = {
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly following_id?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "followings" */
export enum Followings_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FollowingId = 'following_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** columns and relationships of "geofence_variants" */
export type Geofence_Variants = {
  readonly __typename: 'geofence_variants';
  readonly description?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly geofences: ReadonlyArray<Geofences>;
  /** An aggregated array relationship */
  readonly geofences_aggregate: Geofences_Aggregate;
  readonly name: Scalars['String'];
};

/** columns and relationships of "geofence_variants" */
export type Geofence_VariantsGeofencesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** columns and relationships of "geofence_variants" */
export type Geofence_VariantsGeofences_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** aggregated selection of "geofence_variants" */
export type Geofence_Variants_Aggregate = {
  readonly __typename: 'geofence_variants_aggregate';
  readonly aggregate?: Maybe<Geofence_Variants_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Geofence_Variants>;
};

/** aggregate fields of "geofence_variants" */
export type Geofence_Variants_Aggregate_Fields = {
  readonly __typename: 'geofence_variants_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Geofence_Variants_Max_Fields>;
  readonly min?: Maybe<Geofence_Variants_Min_Fields>;
};

/** aggregate fields of "geofence_variants" */
export type Geofence_Variants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Geofence_Variants_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "geofence_variants" */
export type Geofence_Variants_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Geofence_Variants_Max_Order_By>;
  readonly min?: Maybe<Geofence_Variants_Min_Order_By>;
};

/** input type for inserting array relation for remote table "geofence_variants" */
export type Geofence_Variants_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Geofence_Variants_Insert_Input>;
  readonly on_conflict?: Maybe<Geofence_Variants_On_Conflict>;
};

/** Boolean expression to filter rows from the table "geofence_variants". All fields are combined with a logical 'AND'. */
export type Geofence_Variants_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Geofence_Variants_Bool_Exp>>>;
  readonly _not?: Maybe<Geofence_Variants_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Geofence_Variants_Bool_Exp>>>;
  readonly description?: Maybe<String_Comparison_Exp>;
  readonly geofences?: Maybe<Geofences_Bool_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "geofence_variants" */
export enum Geofence_Variants_Constraint {
  /** unique or primary key constraint */
  GeoFenceCategoriesPkey = 'geo_fence_categories_pkey',
}

export enum Geofence_Variants_Enum {
  /** Circle geofence */
  Circle = 'CIRCLE',
  /** Polygon geofence */
  Polygon = 'POLYGON',
}

/** expression to compare columns of type geofence_variants_enum. All fields are combined with logical 'AND'. */
export type Geofence_Variants_Enum_Comparison_Exp = {
  readonly _eq?: Maybe<Geofence_Variants_Enum>;
  readonly _in?: Maybe<ReadonlyArray<Geofence_Variants_Enum>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _neq?: Maybe<Geofence_Variants_Enum>;
  readonly _nin?: Maybe<ReadonlyArray<Geofence_Variants_Enum>>;
};

/** input type for inserting data into table "geofence_variants" */
export type Geofence_Variants_Insert_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly geofences?: Maybe<Geofences_Arr_Rel_Insert_Input>;
  readonly name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Geofence_Variants_Max_Fields = {
  readonly __typename: 'geofence_variants_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "geofence_variants" */
export type Geofence_Variants_Max_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Geofence_Variants_Min_Fields = {
  readonly __typename: 'geofence_variants_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "geofence_variants" */
export type Geofence_Variants_Min_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** response of any mutation on the table "geofence_variants" */
export type Geofence_Variants_Mutation_Response = {
  readonly __typename: 'geofence_variants_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Geofence_Variants>;
};

/** input type for inserting object relation for remote table "geofence_variants" */
export type Geofence_Variants_Obj_Rel_Insert_Input = {
  readonly data: Geofence_Variants_Insert_Input;
  readonly on_conflict?: Maybe<Geofence_Variants_On_Conflict>;
};

/** on conflict condition type for table "geofence_variants" */
export type Geofence_Variants_On_Conflict = {
  readonly constraint: Geofence_Variants_Constraint;
  readonly update_columns: ReadonlyArray<Geofence_Variants_Update_Column>;
  readonly where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** ordering options when selecting data from "geofence_variants" */
export type Geofence_Variants_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly geofences_aggregate?: Maybe<Geofences_Aggregate_Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** primary key columns input for table: "geofence_variants" */
export type Geofence_Variants_Pk_Columns_Input = {
  readonly name: Scalars['String'];
};

/** select columns of table "geofence_variants" */
export enum Geofence_Variants_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "geofence_variants" */
export type Geofence_Variants_Set_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** update columns of table "geofence_variants" */
export enum Geofence_Variants_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
}

/** columns and relationships of "geofences" */
export type Geofences = {
  readonly __typename: 'geofences';
  /** An array relationship */
  readonly activities: ReadonlyArray<Activities>;
  /** An aggregated array relationship */
  readonly activities_aggregate: Activities_Aggregate;
  readonly category: Scalars['String'];
  /** Only for polygons */
  readonly coordinates?: Maybe<Scalars['String']>;
  readonly created_at: Scalars['timestamptz'];
  readonly description?: Maybe<Scalars['String']>;
  /** An object relationship */
  readonly geofenceByCategory: Categories;
  /** An object relationship */
  readonly geofence_variant: Geofence_Variants;
  readonly id: Scalars['Int'];
  readonly latitude: Scalars['float8'];
  readonly longitude: Scalars['float8'];
  readonly name: Scalars['String'];
  readonly radius: Scalars['float8'];
  readonly updated_at: Scalars['timestamptz'];
  readonly variant: Geofence_Variants_Enum;
};

/** columns and relationships of "geofences" */
export type GeofencesActivitiesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** columns and relationships of "geofences" */
export type GeofencesActivities_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** aggregated selection of "geofences" */
export type Geofences_Aggregate = {
  readonly __typename: 'geofences_aggregate';
  readonly aggregate?: Maybe<Geofences_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Geofences>;
};

/** aggregate fields of "geofences" */
export type Geofences_Aggregate_Fields = {
  readonly __typename: 'geofences_aggregate_fields';
  readonly avg?: Maybe<Geofences_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Geofences_Max_Fields>;
  readonly min?: Maybe<Geofences_Min_Fields>;
  readonly stddev?: Maybe<Geofences_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Geofences_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Geofences_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Geofences_Sum_Fields>;
  readonly var_pop?: Maybe<Geofences_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Geofences_Var_Samp_Fields>;
  readonly variance?: Maybe<Geofences_Variance_Fields>;
};

/** aggregate fields of "geofences" */
export type Geofences_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Geofences_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "geofences" */
export type Geofences_Aggregate_Order_By = {
  readonly avg?: Maybe<Geofences_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Geofences_Max_Order_By>;
  readonly min?: Maybe<Geofences_Min_Order_By>;
  readonly stddev?: Maybe<Geofences_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Geofences_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Geofences_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Geofences_Sum_Order_By>;
  readonly var_pop?: Maybe<Geofences_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Geofences_Var_Samp_Order_By>;
  readonly variance?: Maybe<Geofences_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "geofences" */
export type Geofences_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Geofences_Insert_Input>;
  readonly on_conflict?: Maybe<Geofences_On_Conflict>;
};

/** aggregate avg on columns */
export type Geofences_Avg_Fields = {
  readonly __typename: 'geofences_avg_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
  readonly radius?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "geofences" */
export type Geofences_Avg_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "geofences". All fields are combined with a logical 'AND'. */
export type Geofences_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Geofences_Bool_Exp>>>;
  readonly _not?: Maybe<Geofences_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Geofences_Bool_Exp>>>;
  readonly activities?: Maybe<Activities_Bool_Exp>;
  readonly category?: Maybe<String_Comparison_Exp>;
  readonly coordinates?: Maybe<String_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly description?: Maybe<String_Comparison_Exp>;
  readonly geofenceByCategory?: Maybe<Categories_Bool_Exp>;
  readonly geofence_variant?: Maybe<Geofence_Variants_Bool_Exp>;
  readonly id?: Maybe<Int_Comparison_Exp>;
  readonly latitude?: Maybe<Float8_Comparison_Exp>;
  readonly longitude?: Maybe<Float8_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly radius?: Maybe<Float8_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly variant?: Maybe<Geofence_Variants_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "geofences" */
export enum Geofences_Constraint {
  /** unique or primary key constraint */
  GeofencesCoordinatesKey = 'geofences_coordinates_key',
  /** unique or primary key constraint */
  GeofencesLatitudeLongitudeKey = 'geofences_latitude_longitude_key',
  /** unique or primary key constraint */
  GeofencesNameKey = 'geofences_name_key',
  /** unique or primary key constraint */
  GeofencesPkey = 'geofences_pkey',
}

/** input type for incrementing integer column in table "geofences" */
export type Geofences_Inc_Input = {
  readonly id?: Maybe<Scalars['Int']>;
  readonly latitude?: Maybe<Scalars['float8']>;
  readonly longitude?: Maybe<Scalars['float8']>;
  readonly radius?: Maybe<Scalars['float8']>;
};

/** input type for inserting data into table "geofences" */
export type Geofences_Insert_Input = {
  readonly activities?: Maybe<Activities_Arr_Rel_Insert_Input>;
  readonly category?: Maybe<Scalars['String']>;
  readonly coordinates?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly geofenceByCategory?: Maybe<Categories_Obj_Rel_Insert_Input>;
  readonly geofence_variant?: Maybe<Geofence_Variants_Obj_Rel_Insert_Input>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly latitude?: Maybe<Scalars['float8']>;
  readonly longitude?: Maybe<Scalars['float8']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly radius?: Maybe<Scalars['float8']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly variant?: Maybe<Geofence_Variants_Enum>;
};

/** aggregate max on columns */
export type Geofences_Max_Fields = {
  readonly __typename: 'geofences_max_fields';
  readonly category?: Maybe<Scalars['String']>;
  readonly coordinates?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly latitude?: Maybe<Scalars['float8']>;
  readonly longitude?: Maybe<Scalars['float8']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly radius?: Maybe<Scalars['float8']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "geofences" */
export type Geofences_Max_Order_By = {
  readonly category?: Maybe<Order_By>;
  readonly coordinates?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly description?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Geofences_Min_Fields = {
  readonly __typename: 'geofences_min_fields';
  readonly category?: Maybe<Scalars['String']>;
  readonly coordinates?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly latitude?: Maybe<Scalars['float8']>;
  readonly longitude?: Maybe<Scalars['float8']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly radius?: Maybe<Scalars['float8']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "geofences" */
export type Geofences_Min_Order_By = {
  readonly category?: Maybe<Order_By>;
  readonly coordinates?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly description?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "geofences" */
export type Geofences_Mutation_Response = {
  readonly __typename: 'geofences_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Geofences>;
};

/** input type for inserting object relation for remote table "geofences" */
export type Geofences_Obj_Rel_Insert_Input = {
  readonly data: Geofences_Insert_Input;
  readonly on_conflict?: Maybe<Geofences_On_Conflict>;
};

/** on conflict condition type for table "geofences" */
export type Geofences_On_Conflict = {
  readonly constraint: Geofences_Constraint;
  readonly update_columns: ReadonlyArray<Geofences_Update_Column>;
  readonly where?: Maybe<Geofences_Bool_Exp>;
};

/** ordering options when selecting data from "geofences" */
export type Geofences_Order_By = {
  readonly activities_aggregate?: Maybe<Activities_Aggregate_Order_By>;
  readonly category?: Maybe<Order_By>;
  readonly coordinates?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly description?: Maybe<Order_By>;
  readonly geofenceByCategory?: Maybe<Categories_Order_By>;
  readonly geofence_variant?: Maybe<Geofence_Variants_Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly variant?: Maybe<Order_By>;
};

/** primary key columns input for table: "geofences" */
export type Geofences_Pk_Columns_Input = {
  readonly id: Scalars['Int'];
};

/** select columns of table "geofences" */
export enum Geofences_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Coordinates = 'coordinates',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  Radius = 'radius',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Variant = 'variant',
}

/** input type for updating data in table "geofences" */
export type Geofences_Set_Input = {
  readonly category?: Maybe<Scalars['String']>;
  readonly coordinates?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly latitude?: Maybe<Scalars['float8']>;
  readonly longitude?: Maybe<Scalars['float8']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly radius?: Maybe<Scalars['float8']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly variant?: Maybe<Geofence_Variants_Enum>;
};

/** aggregate stddev on columns */
export type Geofences_Stddev_Fields = {
  readonly __typename: 'geofences_stddev_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
  readonly radius?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "geofences" */
export type Geofences_Stddev_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Geofences_Stddev_Pop_Fields = {
  readonly __typename: 'geofences_stddev_pop_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
  readonly radius?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "geofences" */
export type Geofences_Stddev_Pop_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Geofences_Stddev_Samp_Fields = {
  readonly __typename: 'geofences_stddev_samp_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
  readonly radius?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "geofences" */
export type Geofences_Stddev_Samp_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Geofences_Sum_Fields = {
  readonly __typename: 'geofences_sum_fields';
  readonly id?: Maybe<Scalars['Int']>;
  readonly latitude?: Maybe<Scalars['float8']>;
  readonly longitude?: Maybe<Scalars['float8']>;
  readonly radius?: Maybe<Scalars['float8']>;
};

/** order by sum() on columns of table "geofences" */
export type Geofences_Sum_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
};

/** update columns of table "geofences" */
export enum Geofences_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Coordinates = 'coordinates',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  Radius = 'radius',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Variant = 'variant',
}

/** aggregate var_pop on columns */
export type Geofences_Var_Pop_Fields = {
  readonly __typename: 'geofences_var_pop_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
  readonly radius?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "geofences" */
export type Geofences_Var_Pop_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Geofences_Var_Samp_Fields = {
  readonly __typename: 'geofences_var_samp_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
  readonly radius?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "geofences" */
export type Geofences_Var_Samp_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Geofences_Variance_Fields = {
  readonly __typename: 'geofences_variance_fields';
  readonly id?: Maybe<Scalars['Float']>;
  readonly latitude?: Maybe<Scalars['Float']>;
  readonly longitude?: Maybe<Scalars['Float']>;
  readonly radius?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "geofences" */
export type Geofences_Variance_Order_By = {
  readonly id?: Maybe<Order_By>;
  readonly latitude?: Maybe<Order_By>;
  readonly longitude?: Maybe<Order_By>;
  readonly radius?: Maybe<Order_By>;
};

/** expression to compare columns of type interval. All fields are combined with logical 'AND'. */
export type Interval_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['interval']>;
  readonly _gt?: Maybe<Scalars['interval']>;
  readonly _gte?: Maybe<Scalars['interval']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['interval']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['interval']>;
  readonly _lte?: Maybe<Scalars['interval']>;
  readonly _neq?: Maybe<Scalars['interval']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['interval']>>;
};

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['json']>;
  readonly _gt?: Maybe<Scalars['json']>;
  readonly _gte?: Maybe<Scalars['json']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['json']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['json']>;
  readonly _lte?: Maybe<Scalars['json']>;
  readonly _neq?: Maybe<Scalars['json']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['json']>>;
};

/** columns and relationships of "likes" */
export type Likes = {
  readonly __typename: 'likes';
  /** An object relationship */
  readonly activity: Activities;
  readonly activity_id: Scalars['Int'];
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  readonly user: Users;
  readonly user_id: Scalars['String'];
};

/** aggregated selection of "likes" */
export type Likes_Aggregate = {
  readonly __typename: 'likes_aggregate';
  readonly aggregate?: Maybe<Likes_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Likes>;
};

/** aggregate fields of "likes" */
export type Likes_Aggregate_Fields = {
  readonly __typename: 'likes_aggregate_fields';
  readonly avg?: Maybe<Likes_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Likes_Max_Fields>;
  readonly min?: Maybe<Likes_Min_Fields>;
  readonly stddev?: Maybe<Likes_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Likes_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Likes_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Likes_Sum_Fields>;
  readonly var_pop?: Maybe<Likes_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Likes_Var_Samp_Fields>;
  readonly variance?: Maybe<Likes_Variance_Fields>;
};

/** aggregate fields of "likes" */
export type Likes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Likes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "likes" */
export type Likes_Aggregate_Order_By = {
  readonly avg?: Maybe<Likes_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Likes_Max_Order_By>;
  readonly min?: Maybe<Likes_Min_Order_By>;
  readonly stddev?: Maybe<Likes_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<Likes_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<Likes_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<Likes_Sum_Order_By>;
  readonly var_pop?: Maybe<Likes_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<Likes_Var_Samp_Order_By>;
  readonly variance?: Maybe<Likes_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "likes" */
export type Likes_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Likes_Insert_Input>;
  readonly on_conflict?: Maybe<Likes_On_Conflict>;
};

/** aggregate avg on columns */
export type Likes_Avg_Fields = {
  readonly __typename: 'likes_avg_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "likes" */
export type Likes_Avg_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "likes". All fields are combined with a logical 'AND'. */
export type Likes_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Likes_Bool_Exp>>>;
  readonly _not?: Maybe<Likes_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Likes_Bool_Exp>>>;
  readonly activity?: Maybe<Activities_Bool_Exp>;
  readonly activity_id?: Maybe<Int_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "likes" */
export enum Likes_Constraint {
  /** unique or primary key constraint */
  LikesPkey = 'Likes_pkey',
  /** unique or primary key constraint */
  LikesUserIdActivityIdKey = 'Likes_user_id_activity_id_key',
}

/** input type for incrementing integer column in table "likes" */
export type Likes_Inc_Input = {
  readonly activity_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "likes" */
export type Likes_Insert_Input = {
  readonly activity?: Maybe<Activities_Obj_Rel_Insert_Input>;
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Likes_Max_Fields = {
  readonly __typename: 'likes_max_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "likes" */
export type Likes_Max_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Likes_Min_Fields = {
  readonly __typename: 'likes_min_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "likes" */
export type Likes_Min_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "likes" */
export type Likes_Mutation_Response = {
  readonly __typename: 'likes_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Likes>;
};

/** input type for inserting object relation for remote table "likes" */
export type Likes_Obj_Rel_Insert_Input = {
  readonly data: Likes_Insert_Input;
  readonly on_conflict?: Maybe<Likes_On_Conflict>;
};

/** on conflict condition type for table "likes" */
export type Likes_On_Conflict = {
  readonly constraint: Likes_Constraint;
  readonly update_columns: ReadonlyArray<Likes_Update_Column>;
  readonly where?: Maybe<Likes_Bool_Exp>;
};

/** ordering options when selecting data from "likes" */
export type Likes_Order_By = {
  readonly activity?: Maybe<Activities_Order_By>;
  readonly activity_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "likes" */
export type Likes_Pk_Columns_Input = {
  readonly activity_id: Scalars['Int'];
  readonly user_id: Scalars['String'];
};

/** select columns of table "likes" */
export enum Likes_Select_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "likes" */
export type Likes_Set_Input = {
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Likes_Stddev_Fields = {
  readonly __typename: 'likes_stddev_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "likes" */
export type Likes_Stddev_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Likes_Stddev_Pop_Fields = {
  readonly __typename: 'likes_stddev_pop_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "likes" */
export type Likes_Stddev_Pop_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Likes_Stddev_Samp_Fields = {
  readonly __typename: 'likes_stddev_samp_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "likes" */
export type Likes_Stddev_Samp_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Likes_Sum_Fields = {
  readonly __typename: 'likes_sum_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "likes" */
export type Likes_Sum_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
};

/** update columns of table "likes" */
export enum Likes_Update_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Likes_Var_Pop_Fields = {
  readonly __typename: 'likes_var_pop_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "likes" */
export type Likes_Var_Pop_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Likes_Var_Samp_Fields = {
  readonly __typename: 'likes_var_samp_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "likes" */
export type Likes_Var_Samp_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Likes_Variance_Fields = {
  readonly __typename: 'likes_variance_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "likes" */
export type Likes_Variance_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  readonly __typename: 'mutation_root';
  /** delete data from the table: "achievement" */
  readonly delete_achievement?: Maybe<Achievement_Mutation_Response>;
  /** delete single row from the table: "achievement" */
  readonly delete_achievement_by_pk?: Maybe<Achievement>;
  /** delete data from the table: "achievement_type" */
  readonly delete_achievement_type?: Maybe<Achievement_Type_Mutation_Response>;
  /** delete single row from the table: "achievement_type" */
  readonly delete_achievement_type_by_pk?: Maybe<Achievement_Type>;
  /** delete data from the table: "activities" */
  readonly delete_activities?: Maybe<Activities_Mutation_Response>;
  /** delete single row from the table: "activities" */
  readonly delete_activities_by_pk?: Maybe<Activities>;
  /** delete data from the table: "categories" */
  readonly delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete single row from the table: "categories" */
  readonly delete_categories_by_pk?: Maybe<Categories>;
  /** delete data from the table: "challenge" */
  readonly delete_challenge?: Maybe<Challenge_Mutation_Response>;
  /** delete single row from the table: "challenge" */
  readonly delete_challenge_by_pk?: Maybe<Challenge>;
  /** delete data from the table: "challenge_participant" */
  readonly delete_challenge_participant?: Maybe<Challenge_Participant_Mutation_Response>;
  /** delete single row from the table: "challenge_participant" */
  readonly delete_challenge_participant_by_pk?: Maybe<Challenge_Participant>;
  /** delete data from the table: "challenge_type" */
  readonly delete_challenge_type?: Maybe<Challenge_Type_Mutation_Response>;
  /** delete single row from the table: "challenge_type" */
  readonly delete_challenge_type_by_pk?: Maybe<Challenge_Type>;
  /** delete single row from the table: "comments" */
  readonly delete_comment?: Maybe<Comments>;
  /** delete data from the table: "comments" */
  readonly delete_comments?: Maybe<Comments_Mutation_Response>;
  /** delete data from the table: "followings" */
  readonly delete_followings?: Maybe<Followings_Mutation_Response>;
  /** delete single row from the table: "followings" */
  readonly delete_followings_by_pk?: Maybe<Followings>;
  /** delete data from the table: "geofence_variants" */
  readonly delete_geofence_variants?: Maybe<Geofence_Variants_Mutation_Response>;
  /** delete single row from the table: "geofence_variants" */
  readonly delete_geofence_variants_by_pk?: Maybe<Geofence_Variants>;
  /** delete data from the table: "geofences" */
  readonly delete_geofences?: Maybe<Geofences_Mutation_Response>;
  /** delete single row from the table: "geofences" */
  readonly delete_geofences_by_pk?: Maybe<Geofences>;
  /** delete data from the table: "likes" */
  readonly delete_likes?: Maybe<Likes_Mutation_Response>;
  /** delete single row from the table: "likes" */
  readonly delete_likes_by_pk?: Maybe<Likes>;
  /** delete single row from the table: "users" */
  readonly delete_user?: Maybe<Users>;
  /** delete data from the table: "user_achievement" */
  readonly delete_user_achievement?: Maybe<User_Achievement_Mutation_Response>;
  /** delete single row from the table: "user_achievement" */
  readonly delete_user_achievement_by_pk?: Maybe<User_Achievement>;
  /** delete data from the table: "users" */
  readonly delete_users?: Maybe<Users_Mutation_Response>;
  /** insert data into the table: "achievement" */
  readonly insert_achievement?: Maybe<Achievement_Mutation_Response>;
  /** insert a single row into the table: "achievement" */
  readonly insert_achievement_one?: Maybe<Achievement>;
  /** insert data into the table: "achievement_type" */
  readonly insert_achievement_type?: Maybe<Achievement_Type_Mutation_Response>;
  /** insert a single row into the table: "achievement_type" */
  readonly insert_achievement_type_one?: Maybe<Achievement_Type>;
  /** insert data into the table: "activities" */
  readonly insert_activities?: Maybe<Activities_Mutation_Response>;
  /** insert a single row into the table: "activities" */
  readonly insert_activities_one?: Maybe<Activities>;
  /** insert data into the table: "categories" */
  readonly insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert a single row into the table: "categories" */
  readonly insert_categories_one?: Maybe<Categories>;
  /** insert data into the table: "challenge" */
  readonly insert_challenge?: Maybe<Challenge_Mutation_Response>;
  /** insert a single row into the table: "challenge" */
  readonly insert_challenge_one?: Maybe<Challenge>;
  /** insert data into the table: "challenge_participant" */
  readonly insert_challenge_participant?: Maybe<Challenge_Participant_Mutation_Response>;
  /** insert a single row into the table: "challenge_participant" */
  readonly insert_challenge_participant_one?: Maybe<Challenge_Participant>;
  /** insert data into the table: "challenge_type" */
  readonly insert_challenge_type?: Maybe<Challenge_Type_Mutation_Response>;
  /** insert a single row into the table: "challenge_type" */
  readonly insert_challenge_type_one?: Maybe<Challenge_Type>;
  /** insert a single row into the table: "comments" */
  readonly insert_comment?: Maybe<Comments>;
  /** insert data into the table: "comments" */
  readonly insert_comments?: Maybe<Comments_Mutation_Response>;
  /** insert data into the table: "followings" */
  readonly insert_followings?: Maybe<Followings_Mutation_Response>;
  /** insert a single row into the table: "followings" */
  readonly insert_followings_one?: Maybe<Followings>;
  /** insert data into the table: "geofence_variants" */
  readonly insert_geofence_variants?: Maybe<Geofence_Variants_Mutation_Response>;
  /** insert a single row into the table: "geofence_variants" */
  readonly insert_geofence_variants_one?: Maybe<Geofence_Variants>;
  /** insert data into the table: "geofences" */
  readonly insert_geofences?: Maybe<Geofences_Mutation_Response>;
  /** insert a single row into the table: "geofences" */
  readonly insert_geofences_one?: Maybe<Geofences>;
  /** insert data into the table: "likes" */
  readonly insert_likes?: Maybe<Likes_Mutation_Response>;
  /** insert a single row into the table: "likes" */
  readonly insert_likes_one?: Maybe<Likes>;
  /** insert a single row into the table: "users" */
  readonly insert_user?: Maybe<Users>;
  /** insert data into the table: "user_achievement" */
  readonly insert_user_achievement?: Maybe<User_Achievement_Mutation_Response>;
  /** insert a single row into the table: "user_achievement" */
  readonly insert_user_achievement_one?: Maybe<User_Achievement>;
  /** insert data into the table: "users" */
  readonly insert_users?: Maybe<Users_Mutation_Response>;
  /** update data of the table: "achievement" */
  readonly update_achievement?: Maybe<Achievement_Mutation_Response>;
  /** update single row of the table: "achievement" */
  readonly update_achievement_by_pk?: Maybe<Achievement>;
  /** update data of the table: "achievement_type" */
  readonly update_achievement_type?: Maybe<Achievement_Type_Mutation_Response>;
  /** update single row of the table: "achievement_type" */
  readonly update_achievement_type_by_pk?: Maybe<Achievement_Type>;
  /** update data of the table: "activities" */
  readonly update_activities?: Maybe<Activities_Mutation_Response>;
  /** update single row of the table: "activities" */
  readonly update_activities_by_pk?: Maybe<Activities>;
  /** update data of the table: "categories" */
  readonly update_categories?: Maybe<Categories_Mutation_Response>;
  /** update single row of the table: "categories" */
  readonly update_categories_by_pk?: Maybe<Categories>;
  /** update data of the table: "challenge" */
  readonly update_challenge?: Maybe<Challenge_Mutation_Response>;
  /** update single row of the table: "challenge" */
  readonly update_challenge_by_pk?: Maybe<Challenge>;
  /** update data of the table: "challenge_participant" */
  readonly update_challenge_participant?: Maybe<Challenge_Participant_Mutation_Response>;
  /** update single row of the table: "challenge_participant" */
  readonly update_challenge_participant_by_pk?: Maybe<Challenge_Participant>;
  /** update data of the table: "challenge_type" */
  readonly update_challenge_type?: Maybe<Challenge_Type_Mutation_Response>;
  /** update single row of the table: "challenge_type" */
  readonly update_challenge_type_by_pk?: Maybe<Challenge_Type>;
  /** update single row of the table: "comments" */
  readonly update_comment?: Maybe<Comments>;
  /** update data of the table: "comments" */
  readonly update_comments?: Maybe<Comments_Mutation_Response>;
  /** update data of the table: "followings" */
  readonly update_followings?: Maybe<Followings_Mutation_Response>;
  /** update single row of the table: "followings" */
  readonly update_followings_by_pk?: Maybe<Followings>;
  /** update data of the table: "geofence_variants" */
  readonly update_geofence_variants?: Maybe<Geofence_Variants_Mutation_Response>;
  /** update single row of the table: "geofence_variants" */
  readonly update_geofence_variants_by_pk?: Maybe<Geofence_Variants>;
  /** update data of the table: "geofences" */
  readonly update_geofences?: Maybe<Geofences_Mutation_Response>;
  /** update single row of the table: "geofences" */
  readonly update_geofences_by_pk?: Maybe<Geofences>;
  /** update data of the table: "likes" */
  readonly update_likes?: Maybe<Likes_Mutation_Response>;
  /** update single row of the table: "likes" */
  readonly update_likes_by_pk?: Maybe<Likes>;
  /** update single row of the table: "users" */
  readonly update_user?: Maybe<Users>;
  /** update data of the table: "user_achievement" */
  readonly update_user_achievement?: Maybe<User_Achievement_Mutation_Response>;
  /** update single row of the table: "user_achievement" */
  readonly update_user_achievement_by_pk?: Maybe<User_Achievement>;
  /** update data of the table: "users" */
  readonly update_users?: Maybe<Users_Mutation_Response>;
};

/** mutation root */
export type Mutation_RootDelete_AchievementArgs = {
  where: Achievement_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Achievement_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_Achievement_TypeArgs = {
  where: Achievement_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Achievement_Type_By_PkArgs = {
  name: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_ActivitiesArgs = {
  where: Activities_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Activities_By_PkArgs = {
  activity_id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_CategoriesArgs = {
  where: Categories_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Categories_By_PkArgs = {
  name: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_ChallengeArgs = {
  where: Challenge_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Challenge_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_Challenge_ParticipantArgs = {
  where: Challenge_Participant_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Challenge_Participant_By_PkArgs = {
  challenge_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_Challenge_TypeArgs = {
  where: Challenge_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Challenge_Type_By_PkArgs = {
  name: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_CommentArgs = {
  comment_id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_CommentsArgs = {
  where: Comments_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_FollowingsArgs = {
  where: Followings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Followings_By_PkArgs = {
  following_id: Scalars['String'];
  user_id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_Geofence_VariantsArgs = {
  where: Geofence_Variants_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Geofence_Variants_By_PkArgs = {
  name: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_GeofencesArgs = {
  where: Geofences_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Geofences_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_LikesArgs = {
  where: Likes_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Likes_By_PkArgs = {
  activity_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_User_AchievementArgs = {
  where: User_Achievement_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_User_Achievement_By_PkArgs = {
  achievement_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootInsert_AchievementArgs = {
  objects: ReadonlyArray<Achievement_Insert_Input>;
  on_conflict?: Maybe<Achievement_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Achievement_OneArgs = {
  object: Achievement_Insert_Input;
  on_conflict?: Maybe<Achievement_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Achievement_TypeArgs = {
  objects: ReadonlyArray<Achievement_Type_Insert_Input>;
  on_conflict?: Maybe<Achievement_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Achievement_Type_OneArgs = {
  object: Achievement_Type_Insert_Input;
  on_conflict?: Maybe<Achievement_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ActivitiesArgs = {
  objects: ReadonlyArray<Activities_Insert_Input>;
  on_conflict?: Maybe<Activities_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Activities_OneArgs = {
  object: Activities_Insert_Input;
  on_conflict?: Maybe<Activities_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_CategoriesArgs = {
  objects: ReadonlyArray<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Categories_OneArgs = {
  object: Categories_Insert_Input;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ChallengeArgs = {
  objects: ReadonlyArray<Challenge_Insert_Input>;
  on_conflict?: Maybe<Challenge_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_OneArgs = {
  object: Challenge_Insert_Input;
  on_conflict?: Maybe<Challenge_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_ParticipantArgs = {
  objects: ReadonlyArray<Challenge_Participant_Insert_Input>;
  on_conflict?: Maybe<Challenge_Participant_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_Participant_OneArgs = {
  object: Challenge_Participant_Insert_Input;
  on_conflict?: Maybe<Challenge_Participant_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_TypeArgs = {
  objects: ReadonlyArray<Challenge_Type_Insert_Input>;
  on_conflict?: Maybe<Challenge_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_Type_OneArgs = {
  object: Challenge_Type_Insert_Input;
  on_conflict?: Maybe<Challenge_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_CommentArgs = {
  object: Comments_Insert_Input;
  on_conflict?: Maybe<Comments_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_CommentsArgs = {
  objects: ReadonlyArray<Comments_Insert_Input>;
  on_conflict?: Maybe<Comments_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_FollowingsArgs = {
  objects: ReadonlyArray<Followings_Insert_Input>;
  on_conflict?: Maybe<Followings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Followings_OneArgs = {
  object: Followings_Insert_Input;
  on_conflict?: Maybe<Followings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Geofence_VariantsArgs = {
  objects: ReadonlyArray<Geofence_Variants_Insert_Input>;
  on_conflict?: Maybe<Geofence_Variants_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Geofence_Variants_OneArgs = {
  object: Geofence_Variants_Insert_Input;
  on_conflict?: Maybe<Geofence_Variants_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GeofencesArgs = {
  objects: ReadonlyArray<Geofences_Insert_Input>;
  on_conflict?: Maybe<Geofences_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Geofences_OneArgs = {
  object: Geofences_Insert_Input;
  on_conflict?: Maybe<Geofences_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_LikesArgs = {
  objects: ReadonlyArray<Likes_Insert_Input>;
  on_conflict?: Maybe<Likes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Likes_OneArgs = {
  object: Likes_Insert_Input;
  on_conflict?: Maybe<Likes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_AchievementArgs = {
  objects: ReadonlyArray<User_Achievement_Insert_Input>;
  on_conflict?: Maybe<User_Achievement_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Achievement_OneArgs = {
  object: User_Achievement_Insert_Input;
  on_conflict?: Maybe<User_Achievement_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: ReadonlyArray<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_AchievementArgs = {
  _inc?: Maybe<Achievement_Inc_Input>;
  _set?: Maybe<Achievement_Set_Input>;
  where: Achievement_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Achievement_By_PkArgs = {
  _inc?: Maybe<Achievement_Inc_Input>;
  _set?: Maybe<Achievement_Set_Input>;
  pk_columns: Achievement_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Achievement_TypeArgs = {
  _set?: Maybe<Achievement_Type_Set_Input>;
  where: Achievement_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Achievement_Type_By_PkArgs = {
  _set?: Maybe<Achievement_Type_Set_Input>;
  pk_columns: Achievement_Type_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ActivitiesArgs = {
  _inc?: Maybe<Activities_Inc_Input>;
  _set?: Maybe<Activities_Set_Input>;
  where: Activities_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Activities_By_PkArgs = {
  _inc?: Maybe<Activities_Inc_Input>;
  _set?: Maybe<Activities_Set_Input>;
  pk_columns: Activities_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_CategoriesArgs = {
  _inc?: Maybe<Categories_Inc_Input>;
  _set?: Maybe<Categories_Set_Input>;
  where: Categories_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Categories_By_PkArgs = {
  _inc?: Maybe<Categories_Inc_Input>;
  _set?: Maybe<Categories_Set_Input>;
  pk_columns: Categories_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ChallengeArgs = {
  _inc?: Maybe<Challenge_Inc_Input>;
  _set?: Maybe<Challenge_Set_Input>;
  where: Challenge_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Challenge_By_PkArgs = {
  _inc?: Maybe<Challenge_Inc_Input>;
  _set?: Maybe<Challenge_Set_Input>;
  pk_columns: Challenge_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Challenge_ParticipantArgs = {
  _inc?: Maybe<Challenge_Participant_Inc_Input>;
  _set?: Maybe<Challenge_Participant_Set_Input>;
  where: Challenge_Participant_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Challenge_Participant_By_PkArgs = {
  _inc?: Maybe<Challenge_Participant_Inc_Input>;
  _set?: Maybe<Challenge_Participant_Set_Input>;
  pk_columns: Challenge_Participant_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Challenge_TypeArgs = {
  _set?: Maybe<Challenge_Type_Set_Input>;
  where: Challenge_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Challenge_Type_By_PkArgs = {
  _set?: Maybe<Challenge_Type_Set_Input>;
  pk_columns: Challenge_Type_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_CommentArgs = {
  _inc?: Maybe<Comments_Inc_Input>;
  _set?: Maybe<Comments_Set_Input>;
  pk_columns: Comments_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_CommentsArgs = {
  _inc?: Maybe<Comments_Inc_Input>;
  _set?: Maybe<Comments_Set_Input>;
  where: Comments_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_FollowingsArgs = {
  _set?: Maybe<Followings_Set_Input>;
  where: Followings_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Followings_By_PkArgs = {
  _set?: Maybe<Followings_Set_Input>;
  pk_columns: Followings_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Geofence_VariantsArgs = {
  _set?: Maybe<Geofence_Variants_Set_Input>;
  where: Geofence_Variants_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Geofence_Variants_By_PkArgs = {
  _set?: Maybe<Geofence_Variants_Set_Input>;
  pk_columns: Geofence_Variants_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_GeofencesArgs = {
  _inc?: Maybe<Geofences_Inc_Input>;
  _set?: Maybe<Geofences_Set_Input>;
  where: Geofences_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Geofences_By_PkArgs = {
  _inc?: Maybe<Geofences_Inc_Input>;
  _set?: Maybe<Geofences_Set_Input>;
  pk_columns: Geofences_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_LikesArgs = {
  _inc?: Maybe<Likes_Inc_Input>;
  _set?: Maybe<Likes_Set_Input>;
  where: Likes_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Likes_By_PkArgs = {
  _inc?: Maybe<Likes_Inc_Input>;
  _set?: Maybe<Likes_Set_Input>;
  pk_columns: Likes_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_AchievementArgs = {
  _inc?: Maybe<User_Achievement_Inc_Input>;
  _set?: Maybe<User_Achievement_Set_Input>;
  where: User_Achievement_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_Achievement_By_PkArgs = {
  _inc?: Maybe<User_Achievement_Inc_Input>;
  _set?: Maybe<User_Achievement_Set_Input>;
  pk_columns: User_Achievement_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** query root */
export type Query_Root = {
  readonly __typename: 'query_root';
  /** fetch data from the table: "achievement" */
  readonly achievement: ReadonlyArray<Achievement>;
  /** fetch aggregated fields from the table: "achievement" */
  readonly achievement_aggregate: Achievement_Aggregate;
  /** fetch data from the table: "achievement" using primary key columns */
  readonly achievement_by_pk?: Maybe<Achievement>;
  /** fetch data from the table: "achievement_type" */
  readonly achievement_type: ReadonlyArray<Achievement_Type>;
  /** fetch aggregated fields from the table: "achievement_type" */
  readonly achievement_type_aggregate: Achievement_Type_Aggregate;
  /** fetch data from the table: "achievement_type" using primary key columns */
  readonly achievement_type_by_pk?: Maybe<Achievement_Type>;
  /** fetch data from the table: "activities" */
  readonly activities: ReadonlyArray<Activities>;
  /** fetch aggregated fields from the table: "activities" */
  readonly activities_aggregate: Activities_Aggregate;
  /** fetch data from the table: "activities" using primary key columns */
  readonly activities_by_pk?: Maybe<Activities>;
  /** fetch data from the table: "categories" */
  readonly categories: ReadonlyArray<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  readonly categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  readonly categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "challenge" */
  readonly challenge: ReadonlyArray<Challenge>;
  /** fetch aggregated fields from the table: "challenge" */
  readonly challenge_aggregate: Challenge_Aggregate;
  /** fetch data from the table: "challenge" using primary key columns */
  readonly challenge_by_pk?: Maybe<Challenge>;
  /** fetch data from the table: "challenge_participant" */
  readonly challenge_participant: ReadonlyArray<Challenge_Participant>;
  /** fetch aggregated fields from the table: "challenge_participant" */
  readonly challenge_participant_aggregate: Challenge_Participant_Aggregate;
  /** fetch data from the table: "challenge_participant" using primary key columns */
  readonly challenge_participant_by_pk?: Maybe<Challenge_Participant>;
  /** fetch data from the table: "challenge_type" */
  readonly challenge_type: ReadonlyArray<Challenge_Type>;
  /** fetch aggregated fields from the table: "challenge_type" */
  readonly challenge_type_aggregate: Challenge_Type_Aggregate;
  /** fetch data from the table: "challenge_type" using primary key columns */
  readonly challenge_type_by_pk?: Maybe<Challenge_Type>;
  /** fetch data from the table: "comments" using primary key columns */
  readonly comment?: Maybe<Comments>;
  /** fetch data from the table: "comments" */
  readonly comments: ReadonlyArray<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  readonly comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "followings" */
  readonly followings: ReadonlyArray<Followings>;
  /** fetch aggregated fields from the table: "followings" */
  readonly followings_aggregate: Followings_Aggregate;
  /** fetch data from the table: "followings" using primary key columns */
  readonly followings_by_pk?: Maybe<Followings>;
  /** fetch data from the table: "geofence_variants" */
  readonly geofence_variants: ReadonlyArray<Geofence_Variants>;
  /** fetch aggregated fields from the table: "geofence_variants" */
  readonly geofence_variants_aggregate: Geofence_Variants_Aggregate;
  /** fetch data from the table: "geofence_variants" using primary key columns */
  readonly geofence_variants_by_pk?: Maybe<Geofence_Variants>;
  /** fetch data from the table: "geofences" */
  readonly geofences: ReadonlyArray<Geofences>;
  /** fetch aggregated fields from the table: "geofences" */
  readonly geofences_aggregate: Geofences_Aggregate;
  /** fetch data from the table: "geofences" using primary key columns */
  readonly geofences_by_pk?: Maybe<Geofences>;
  /** fetch data from the table: "likes" */
  readonly likes: ReadonlyArray<Likes>;
  /** fetch aggregated fields from the table: "likes" */
  readonly likes_aggregate: Likes_Aggregate;
  /** fetch data from the table: "likes" using primary key columns */
  readonly likes_by_pk?: Maybe<Likes>;
  /** execute function "unachievedachievements" which returns "achievement" */
  readonly unachievedachievements: ReadonlyArray<Achievement>;
  /** execute function "unachievedachievements" and query aggregates on result of table type "achievement" */
  readonly unachievedachievements_aggregate: Achievement_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  readonly user?: Maybe<Users>;
  /** fetch data from the table: "user_achievement" */
  readonly user_achievement: ReadonlyArray<User_Achievement>;
  /** fetch aggregated fields from the table: "user_achievement" */
  readonly user_achievement_aggregate: User_Achievement_Aggregate;
  /** fetch data from the table: "user_achievement" using primary key columns */
  readonly user_achievement_by_pk?: Maybe<User_Achievement>;
  /** fetch data from the table: "users" */
  readonly users: ReadonlyArray<Users>;
  /** fetch aggregated fields from the table: "users" */
  readonly users_aggregate: Users_Aggregate;
};

/** query root */
export type Query_RootAchievementArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootAchievement_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootAchievement_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootAchievement_TypeArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Type_Order_By>>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** query root */
export type Query_RootAchievement_Type_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Type_Order_By>>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** query root */
export type Query_RootAchievement_Type_By_PkArgs = {
  name: Scalars['String'];
};

/** query root */
export type Query_RootActivitiesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** query root */
export type Query_RootActivities_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** query root */
export type Query_RootActivities_By_PkArgs = {
  activity_id: Scalars['Int'];
};

/** query root */
export type Query_RootCategoriesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** query root */
export type Query_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** query root */
export type Query_RootCategories_By_PkArgs = {
  name: Scalars['String'];
};

/** query root */
export type Query_RootChallengeArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootChallenge_ParticipantArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Participant_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Participant_By_PkArgs = {
  challenge_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** query root */
export type Query_RootChallenge_TypeArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Type_Order_By>>;
  where?: Maybe<Challenge_Type_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Type_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Type_Order_By>>;
  where?: Maybe<Challenge_Type_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Type_By_PkArgs = {
  name: Scalars['String'];
};

/** query root */
export type Query_RootCommentArgs = {
  comment_id: Scalars['Int'];
};

/** query root */
export type Query_RootCommentsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** query root */
export type Query_RootComments_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** query root */
export type Query_RootFollowingsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** query root */
export type Query_RootFollowings_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** query root */
export type Query_RootFollowings_By_PkArgs = {
  following_id: Scalars['String'];
  user_id: Scalars['String'];
};

/** query root */
export type Query_RootGeofence_VariantsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofence_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofence_Variants_Order_By>>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** query root */
export type Query_RootGeofence_Variants_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofence_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofence_Variants_Order_By>>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** query root */
export type Query_RootGeofence_Variants_By_PkArgs = {
  name: Scalars['String'];
};

/** query root */
export type Query_RootGeofencesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** query root */
export type Query_RootGeofences_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** query root */
export type Query_RootGeofences_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootLikesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** query root */
export type Query_RootLikes_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** query root */
export type Query_RootLikes_By_PkArgs = {
  activity_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** query root */
export type Query_RootUnachievedachievementsArgs = {
  args: Unachievedachievements_Args;
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootUnachievedachievements_AggregateArgs = {
  args: Unachievedachievements_Args;
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootUserArgs = {
  id: Scalars['String'];
};

/** query root */
export type Query_RootUser_AchievementArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Achievement_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Achievement_By_PkArgs = {
  achievement_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<ReadonlyArray<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root = {
  readonly __typename: 'subscription_root';
  /** fetch data from the table: "achievement" */
  readonly achievement: ReadonlyArray<Achievement>;
  /** fetch aggregated fields from the table: "achievement" */
  readonly achievement_aggregate: Achievement_Aggregate;
  /** fetch data from the table: "achievement" using primary key columns */
  readonly achievement_by_pk?: Maybe<Achievement>;
  /** fetch data from the table: "achievement_type" */
  readonly achievement_type: ReadonlyArray<Achievement_Type>;
  /** fetch aggregated fields from the table: "achievement_type" */
  readonly achievement_type_aggregate: Achievement_Type_Aggregate;
  /** fetch data from the table: "achievement_type" using primary key columns */
  readonly achievement_type_by_pk?: Maybe<Achievement_Type>;
  /** fetch data from the table: "activities" */
  readonly activities: ReadonlyArray<Activities>;
  /** fetch aggregated fields from the table: "activities" */
  readonly activities_aggregate: Activities_Aggregate;
  /** fetch data from the table: "activities" using primary key columns */
  readonly activities_by_pk?: Maybe<Activities>;
  /** fetch data from the table: "categories" */
  readonly categories: ReadonlyArray<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  readonly categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  readonly categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "challenge" */
  readonly challenge: ReadonlyArray<Challenge>;
  /** fetch aggregated fields from the table: "challenge" */
  readonly challenge_aggregate: Challenge_Aggregate;
  /** fetch data from the table: "challenge" using primary key columns */
  readonly challenge_by_pk?: Maybe<Challenge>;
  /** fetch data from the table: "challenge_participant" */
  readonly challenge_participant: ReadonlyArray<Challenge_Participant>;
  /** fetch aggregated fields from the table: "challenge_participant" */
  readonly challenge_participant_aggregate: Challenge_Participant_Aggregate;
  /** fetch data from the table: "challenge_participant" using primary key columns */
  readonly challenge_participant_by_pk?: Maybe<Challenge_Participant>;
  /** fetch data from the table: "challenge_type" */
  readonly challenge_type: ReadonlyArray<Challenge_Type>;
  /** fetch aggregated fields from the table: "challenge_type" */
  readonly challenge_type_aggregate: Challenge_Type_Aggregate;
  /** fetch data from the table: "challenge_type" using primary key columns */
  readonly challenge_type_by_pk?: Maybe<Challenge_Type>;
  /** fetch data from the table: "comments" using primary key columns */
  readonly comment?: Maybe<Comments>;
  /** fetch data from the table: "comments" */
  readonly comments: ReadonlyArray<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  readonly comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "followings" */
  readonly followings: ReadonlyArray<Followings>;
  /** fetch aggregated fields from the table: "followings" */
  readonly followings_aggregate: Followings_Aggregate;
  /** fetch data from the table: "followings" using primary key columns */
  readonly followings_by_pk?: Maybe<Followings>;
  /** fetch data from the table: "geofence_variants" */
  readonly geofence_variants: ReadonlyArray<Geofence_Variants>;
  /** fetch aggregated fields from the table: "geofence_variants" */
  readonly geofence_variants_aggregate: Geofence_Variants_Aggregate;
  /** fetch data from the table: "geofence_variants" using primary key columns */
  readonly geofence_variants_by_pk?: Maybe<Geofence_Variants>;
  /** fetch data from the table: "geofences" */
  readonly geofences: ReadonlyArray<Geofences>;
  /** fetch aggregated fields from the table: "geofences" */
  readonly geofences_aggregate: Geofences_Aggregate;
  /** fetch data from the table: "geofences" using primary key columns */
  readonly geofences_by_pk?: Maybe<Geofences>;
  /** fetch data from the table: "likes" */
  readonly likes: ReadonlyArray<Likes>;
  /** fetch aggregated fields from the table: "likes" */
  readonly likes_aggregate: Likes_Aggregate;
  /** fetch data from the table: "likes" using primary key columns */
  readonly likes_by_pk?: Maybe<Likes>;
  /** execute function "unachievedachievements" which returns "achievement" */
  readonly unachievedachievements: ReadonlyArray<Achievement>;
  /** execute function "unachievedachievements" and query aggregates on result of table type "achievement" */
  readonly unachievedachievements_aggregate: Achievement_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  readonly user?: Maybe<Users>;
  /** fetch data from the table: "user_achievement" */
  readonly user_achievement: ReadonlyArray<User_Achievement>;
  /** fetch aggregated fields from the table: "user_achievement" */
  readonly user_achievement_aggregate: User_Achievement_Aggregate;
  /** fetch data from the table: "user_achievement" using primary key columns */
  readonly user_achievement_by_pk?: Maybe<User_Achievement>;
  /** fetch data from the table: "users" */
  readonly users: ReadonlyArray<Users>;
  /** fetch aggregated fields from the table: "users" */
  readonly users_aggregate: Users_Aggregate;
};

/** subscription root */
export type Subscription_RootAchievementArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAchievement_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAchievement_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootAchievement_TypeArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Type_Order_By>>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAchievement_Type_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Achievement_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Type_Order_By>>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAchievement_Type_By_PkArgs = {
  name: Scalars['String'];
};

/** subscription root */
export type Subscription_RootActivitiesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootActivities_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootActivities_By_PkArgs = {
  activity_id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootCategoriesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCategories_By_PkArgs = {
  name: Scalars['String'];
};

/** subscription root */
export type Subscription_RootChallengeArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootChallenge_ParticipantArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Participant_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Participant_By_PkArgs = {
  challenge_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootChallenge_TypeArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Type_Order_By>>;
  where?: Maybe<Challenge_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Type_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Challenge_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Challenge_Type_Order_By>>;
  where?: Maybe<Challenge_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Type_By_PkArgs = {
  name: Scalars['String'];
};

/** subscription root */
export type Subscription_RootCommentArgs = {
  comment_id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootCommentsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootComments_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFollowingsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFollowings_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFollowings_By_PkArgs = {
  following_id: Scalars['String'];
  user_id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootGeofence_VariantsArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofence_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofence_Variants_Order_By>>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGeofence_Variants_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofence_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofence_Variants_Order_By>>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGeofence_Variants_By_PkArgs = {
  name: Scalars['String'];
};

/** subscription root */
export type Subscription_RootGeofencesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGeofences_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGeofences_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootLikesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootLikes_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootLikes_By_PkArgs = {
  activity_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootUnachievedachievementsArgs = {
  args: Unachievedachievements_Args;
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUnachievedachievements_AggregateArgs = {
  args: Unachievedachievements_Args;
  distinct_on?: Maybe<ReadonlyArray<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUserArgs = {
  id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootUser_AchievementArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Achievement_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Achievement_By_PkArgs = {
  achievement_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<ReadonlyArray<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** expression to compare columns of type timestamp. All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['timestamp']>;
  readonly _gt?: Maybe<Scalars['timestamp']>;
  readonly _gte?: Maybe<Scalars['timestamp']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['timestamp']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['timestamp']>;
  readonly _lte?: Maybe<Scalars['timestamp']>;
  readonly _neq?: Maybe<Scalars['timestamp']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['timestamp']>>;
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  readonly _eq?: Maybe<Scalars['timestamptz']>;
  readonly _gt?: Maybe<Scalars['timestamptz']>;
  readonly _gte?: Maybe<Scalars['timestamptz']>;
  readonly _in?: Maybe<ReadonlyArray<Scalars['timestamptz']>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _lt?: Maybe<Scalars['timestamptz']>;
  readonly _lte?: Maybe<Scalars['timestamptz']>;
  readonly _neq?: Maybe<Scalars['timestamptz']>;
  readonly _nin?: Maybe<ReadonlyArray<Scalars['timestamptz']>>;
};

export type Unachievedachievements_Args = {
  readonly uid?: Maybe<Scalars['String']>;
};

/** columns and relationships of "user_achievement" */
export type User_Achievement = {
  readonly __typename: 'user_achievement';
  /** An object relationship */
  readonly achievement: Achievement;
  readonly achievement_id: Scalars['Int'];
  readonly created_at: Scalars['timestamptz'];
  /** An object relationship */
  readonly user: Users;
  readonly user_id: Scalars['String'];
};

/** aggregated selection of "user_achievement" */
export type User_Achievement_Aggregate = {
  readonly __typename: 'user_achievement_aggregate';
  readonly aggregate?: Maybe<User_Achievement_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<User_Achievement>;
};

/** aggregate fields of "user_achievement" */
export type User_Achievement_Aggregate_Fields = {
  readonly __typename: 'user_achievement_aggregate_fields';
  readonly avg?: Maybe<User_Achievement_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<User_Achievement_Max_Fields>;
  readonly min?: Maybe<User_Achievement_Min_Fields>;
  readonly stddev?: Maybe<User_Achievement_Stddev_Fields>;
  readonly stddev_pop?: Maybe<User_Achievement_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<User_Achievement_Stddev_Samp_Fields>;
  readonly sum?: Maybe<User_Achievement_Sum_Fields>;
  readonly var_pop?: Maybe<User_Achievement_Var_Pop_Fields>;
  readonly var_samp?: Maybe<User_Achievement_Var_Samp_Fields>;
  readonly variance?: Maybe<User_Achievement_Variance_Fields>;
};

/** aggregate fields of "user_achievement" */
export type User_Achievement_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_achievement" */
export type User_Achievement_Aggregate_Order_By = {
  readonly avg?: Maybe<User_Achievement_Avg_Order_By>;
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<User_Achievement_Max_Order_By>;
  readonly min?: Maybe<User_Achievement_Min_Order_By>;
  readonly stddev?: Maybe<User_Achievement_Stddev_Order_By>;
  readonly stddev_pop?: Maybe<User_Achievement_Stddev_Pop_Order_By>;
  readonly stddev_samp?: Maybe<User_Achievement_Stddev_Samp_Order_By>;
  readonly sum?: Maybe<User_Achievement_Sum_Order_By>;
  readonly var_pop?: Maybe<User_Achievement_Var_Pop_Order_By>;
  readonly var_samp?: Maybe<User_Achievement_Var_Samp_Order_By>;
  readonly variance?: Maybe<User_Achievement_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_achievement" */
export type User_Achievement_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<User_Achievement_Insert_Input>;
  readonly on_conflict?: Maybe<User_Achievement_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Achievement_Avg_Fields = {
  readonly __typename: 'user_achievement_avg_fields';
  readonly achievement_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_achievement" */
export type User_Achievement_Avg_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_achievement". All fields are combined with a logical 'AND'. */
export type User_Achievement_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<User_Achievement_Bool_Exp>>>;
  readonly _not?: Maybe<User_Achievement_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<User_Achievement_Bool_Exp>>>;
  readonly achievement?: Maybe<Achievement_Bool_Exp>;
  readonly achievement_id?: Maybe<Int_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user?: Maybe<Users_Bool_Exp>;
  readonly user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_achievement" */
export enum User_Achievement_Constraint {
  /** unique or primary key constraint */
  UserAchievmentPkey = 'user_achievment_pkey',
}

/** input type for incrementing integer column in table "user_achievement" */
export type User_Achievement_Inc_Input = {
  readonly achievement_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_achievement" */
export type User_Achievement_Insert_Input = {
  readonly achievement?: Maybe<Achievement_Obj_Rel_Insert_Input>;
  readonly achievement_id?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly user?: Maybe<Users_Obj_Rel_Insert_Input>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Achievement_Max_Fields = {
  readonly __typename: 'user_achievement_max_fields';
  readonly achievement_id?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_achievement" */
export type User_Achievement_Max_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Achievement_Min_Fields = {
  readonly __typename: 'user_achievement_min_fields';
  readonly achievement_id?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_achievement" */
export type User_Achievement_Min_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_achievement" */
export type User_Achievement_Mutation_Response = {
  readonly __typename: 'user_achievement_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<User_Achievement>;
};

/** input type for inserting object relation for remote table "user_achievement" */
export type User_Achievement_Obj_Rel_Insert_Input = {
  readonly data: User_Achievement_Insert_Input;
  readonly on_conflict?: Maybe<User_Achievement_On_Conflict>;
};

/** on conflict condition type for table "user_achievement" */
export type User_Achievement_On_Conflict = {
  readonly constraint: User_Achievement_Constraint;
  readonly update_columns: ReadonlyArray<User_Achievement_Update_Column>;
  readonly where?: Maybe<User_Achievement_Bool_Exp>;
};

/** ordering options when selecting data from "user_achievement" */
export type User_Achievement_Order_By = {
  readonly achievement?: Maybe<Achievement_Order_By>;
  readonly achievement_id?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly user?: Maybe<Users_Order_By>;
  readonly user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "user_achievement" */
export type User_Achievement_Pk_Columns_Input = {
  readonly achievement_id: Scalars['Int'];
  readonly user_id: Scalars['String'];
};

/** select columns of table "user_achievement" */
export enum User_Achievement_Select_Column {
  /** column name */
  AchievementId = 'achievement_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "user_achievement" */
export type User_Achievement_Set_Input = {
  readonly achievement_id?: Maybe<Scalars['Int']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Achievement_Stddev_Fields = {
  readonly __typename: 'user_achievement_stddev_fields';
  readonly achievement_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_achievement" */
export type User_Achievement_Stddev_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Achievement_Stddev_Pop_Fields = {
  readonly __typename: 'user_achievement_stddev_pop_fields';
  readonly achievement_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_achievement" */
export type User_Achievement_Stddev_Pop_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Achievement_Stddev_Samp_Fields = {
  readonly __typename: 'user_achievement_stddev_samp_fields';
  readonly achievement_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_achievement" */
export type User_Achievement_Stddev_Samp_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Achievement_Sum_Fields = {
  readonly __typename: 'user_achievement_sum_fields';
  readonly achievement_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_achievement" */
export type User_Achievement_Sum_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
};

/** update columns of table "user_achievement" */
export enum User_Achievement_Update_Column {
  /** column name */
  AchievementId = 'achievement_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type User_Achievement_Var_Pop_Fields = {
  readonly __typename: 'user_achievement_var_pop_fields';
  readonly achievement_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_achievement" */
export type User_Achievement_Var_Pop_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Achievement_Var_Samp_Fields = {
  readonly __typename: 'user_achievement_var_samp_fields';
  readonly achievement_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_achievement" */
export type User_Achievement_Var_Samp_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Achievement_Variance_Fields = {
  readonly __typename: 'user_achievement_variance_fields';
  readonly achievement_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_achievement" */
export type User_Achievement_Variance_Order_By = {
  readonly achievement_id?: Maybe<Order_By>;
};

/** columns and relationships of "users" */
export type Users = {
  readonly __typename: 'users';
  /** An array relationship */
  readonly activities: ReadonlyArray<Activities>;
  /** An aggregated array relationship */
  readonly activities_aggregate: Activities_Aggregate;
  readonly bio?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly email: Scalars['String'];
  /** An array relationship */
  readonly followers: ReadonlyArray<Followings>;
  /** An aggregated array relationship */
  readonly followers_aggregate: Followings_Aggregate;
  /** An array relationship */
  readonly following: ReadonlyArray<Followings>;
  /** An aggregated array relationship */
  readonly following_aggregate: Followings_Aggregate;
  readonly id: Scalars['String'];
  readonly name?: Maybe<Scalars['String']>;
  readonly picture: Scalars['String'];
  /** A computed field, executes function "totalscore" */
  readonly totalScore?: Maybe<Scalars['bigint']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  readonly user_achievement: ReadonlyArray<User_Achievement>;
  /** An aggregated array relationship */
  readonly user_achievement_aggregate: User_Achievement_Aggregate;
};

/** columns and relationships of "users" */
export type UsersActivitiesArgs = {
  distinct_on?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersActivities_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersFollowersArgs = {
  distinct_on?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersFollowers_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersFollowingArgs = {
  distinct_on?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersFollowing_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersUser_AchievementArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersUser_Achievement_AggregateArgs = {
  distinct_on?: Maybe<ReadonlyArray<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<ReadonlyArray<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  readonly __typename: 'users_aggregate';
  readonly aggregate?: Maybe<Users_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  readonly __typename: 'users_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Users_Max_Fields>;
  readonly min?: Maybe<Users_Min_Fields>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Users_Max_Order_By>;
  readonly min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Users_Insert_Input>;
  readonly on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Users_Bool_Exp>>>;
  readonly _not?: Maybe<Users_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Users_Bool_Exp>>>;
  readonly activities?: Maybe<Activities_Bool_Exp>;
  readonly bio?: Maybe<String_Comparison_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly email?: Maybe<String_Comparison_Exp>;
  readonly followers?: Maybe<Followings_Bool_Exp>;
  readonly following?: Maybe<Followings_Bool_Exp>;
  readonly id?: Maybe<String_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
  readonly picture?: Maybe<String_Comparison_Exp>;
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly user_achievement?: Maybe<User_Achievement_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailKey = 'Users_email_key',
  /** unique or primary key constraint */
  UsersIdKey = 'Users_id_key',
  /** unique or primary key constraint */
  UsersPkey = 'Users_pkey',
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  readonly activities?: Maybe<Activities_Arr_Rel_Insert_Input>;
  readonly bio?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly followers?: Maybe<Followings_Arr_Rel_Insert_Input>;
  readonly following?: Maybe<Followings_Arr_Rel_Insert_Input>;
  readonly id?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly picture?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_achievement?: Maybe<User_Achievement_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  readonly __typename: 'users_max_fields';
  readonly bio?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly picture?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  readonly bio?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly email?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly picture?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  readonly __typename: 'users_min_fields';
  readonly bio?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly picture?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  readonly bio?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly email?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly picture?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  readonly __typename: 'users_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  readonly data: Users_Insert_Input;
  readonly on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  readonly constraint: Users_Constraint;
  readonly update_columns: ReadonlyArray<Users_Update_Column>;
  readonly where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  readonly activities_aggregate?: Maybe<Activities_Aggregate_Order_By>;
  readonly bio?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly email?: Maybe<Order_By>;
  readonly followers_aggregate?: Maybe<Followings_Aggregate_Order_By>;
  readonly following_aggregate?: Maybe<Followings_Aggregate_Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
  readonly picture?: Maybe<Order_By>;
  readonly updated_at?: Maybe<Order_By>;
  readonly user_achievement_aggregate?: Maybe<User_Achievement_Aggregate_Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  readonly id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  readonly bio?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly picture?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Picture = 'picture',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type InsertActivityMutationVariables = Types.Exact<{
  activity: Types.Activities_Insert_Input;
}>;

export type InsertActivityMutation = { readonly __typename: 'mutation_root' } & {
  readonly insert_activities_one?: Types.Maybe<{ readonly __typename: 'activities' } & BasicActivityFragmentFragment>;
};

export const InsertActivityDocument = gql`
  mutation InsertActivity($activity: activities_insert_input!) {
    insert_activities_one(object: $activity) {
      ...basicActivityFragment
    }
  }
  ${BasicActivityFragmentFragmentDoc}
`;

/**
 * __useInsertActivityMutation__
 *
 * To run a mutation, you first call `useInsertActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertActivityMutation, { data, loading, error }] = useInsertActivityMutation({
 *   variables: {
 *      activity: // value for 'activity'
 *   },
 * });
 */
export function useInsertActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<InsertActivityMutation, InsertActivityMutationVariables>,
) {
  return Apollo.useMutation<InsertActivityMutation, InsertActivityMutationVariables>(
    InsertActivityDocument,
    baseOptions,
  );
}
export type InsertActivityMutationHookResult = ReturnType<typeof useInsertActivityMutation>;
