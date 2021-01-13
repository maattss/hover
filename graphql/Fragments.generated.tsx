/* eslint-disable */
import * as Types from '../types/types';

import { gql } from '@apollo/client';
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
  float8: any;
  timestamp: any;
  timestamptz: any;
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

/** columns and relationships of "activities" */
export type Activities = {
  readonly __typename: 'activities';
  /** An object relationship */
  readonly activityByCategory: Categories;
  readonly activity_id: Scalars['Int'];
  readonly caption?: Maybe<Scalars['String']>;
  readonly category: Categories_Enum;
  /** An array relationship */
  readonly comments: ReadonlyArray<Comments>;
  /** An aggregated array relationship */
  readonly comments_aggregate: Comments_Aggregate;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  readonly geofence: Geofences;
  readonly geofence_id: Scalars['Int'];
  /** An array relationship */
  readonly likes: ReadonlyArray<Likes>;
  /** An aggregated array relationship */
  readonly likes_aggregate: Likes_Aggregate;
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
};

/** order by avg() on columns of table "activities" */
export type Activities_Avg_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "activities". All fields are combined with a logical 'AND'. */
export type Activities_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Activities_Bool_Exp>>>;
  readonly _not?: Maybe<Activities_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Activities_Bool_Exp>>>;
  readonly activityByCategory?: Maybe<Categories_Bool_Exp>;
  readonly activity_id?: Maybe<Int_Comparison_Exp>;
  readonly caption?: Maybe<String_Comparison_Exp>;
  readonly category?: Maybe<Categories_Enum_Comparison_Exp>;
  readonly comments?: Maybe<Comments_Bool_Exp>;
  readonly created_at?: Maybe<Timestamptz_Comparison_Exp>;
  readonly geofence?: Maybe<Geofences_Bool_Exp>;
  readonly geofence_id?: Maybe<Int_Comparison_Exp>;
  readonly likes?: Maybe<Likes_Bool_Exp>;
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
};

/** input type for inserting data into table "activities" */
export type Activities_Insert_Input = {
  readonly activityByCategory?: Maybe<Categories_Obj_Rel_Insert_Input>;
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly caption?: Maybe<Scalars['String']>;
  readonly category?: Maybe<Categories_Enum>;
  readonly comments?: Maybe<Comments_Arr_Rel_Insert_Input>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly geofence?: Maybe<Geofences_Obj_Rel_Insert_Input>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
  readonly likes?: Maybe<Likes_Arr_Rel_Insert_Input>;
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
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "activities" */
export type Activities_Max_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly caption?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
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
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "activities" */
export type Activities_Min_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly caption?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
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
  readonly activityByCategory?: Maybe<Categories_Order_By>;
  readonly activity_id?: Maybe<Order_By>;
  readonly caption?: Maybe<Order_By>;
  readonly category?: Maybe<Order_By>;
  readonly comments_aggregate?: Maybe<Comments_Aggregate_Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly geofence?: Maybe<Geofences_Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
  readonly likes_aggregate?: Maybe<Likes_Aggregate_Order_By>;
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
  Category = 'category',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GeofenceId = 'geofence_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "activities" */
export type Activities_Set_Input = {
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly caption?: Maybe<Scalars['String']>;
  readonly category?: Maybe<Categories_Enum>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
  readonly user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Activities_Stddev_Fields = {
  readonly __typename: 'activities_stddev_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "activities" */
export type Activities_Stddev_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Activities_Stddev_Pop_Fields = {
  readonly __typename: 'activities_stddev_pop_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "activities" */
export type Activities_Stddev_Pop_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Activities_Stddev_Samp_Fields = {
  readonly __typename: 'activities_stddev_samp_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "activities" */
export type Activities_Stddev_Samp_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Activities_Sum_Fields = {
  readonly __typename: 'activities_sum_fields';
  readonly activity_id?: Maybe<Scalars['Int']>;
  readonly geofence_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "activities" */
export type Activities_Sum_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
};

/** update columns of table "activities" */
export enum Activities_Update_Column {
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  Caption = 'caption',
  /** column name */
  Category = 'category',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GeofenceId = 'geofence_id',
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
};

/** order by var_pop() on columns of table "activities" */
export type Activities_Var_Pop_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Activities_Var_Samp_Fields = {
  readonly __typename: 'activities_var_samp_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "activities" */
export type Activities_Var_Samp_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Activities_Variance_Fields = {
  readonly __typename: 'activities_variance_fields';
  readonly activity_id?: Maybe<Scalars['Float']>;
  readonly geofence_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "activities" */
export type Activities_Variance_Order_By = {
  readonly activity_id?: Maybe<Order_By>;
  readonly geofence_id?: Maybe<Order_By>;
};

/** columns and relationships of "categories" */
export type Categories = {
  readonly __typename: 'categories';
  readonly description?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
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
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Categories_Max_Fields>;
  readonly min?: Maybe<Categories_Min_Fields>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<ReadonlyArray<Categories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "categories" */
export type Categories_Aggregate_Order_By = {
  readonly count?: Maybe<Order_By>;
  readonly max?: Maybe<Categories_Max_Order_By>;
  readonly min?: Maybe<Categories_Min_Order_By>;
};

/** input type for inserting array relation for remote table "categories" */
export type Categories_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Categories_Insert_Input>;
  readonly on_conflict?: Maybe<Categories_On_Conflict>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  readonly _and?: Maybe<ReadonlyArray<Maybe<Categories_Bool_Exp>>>;
  readonly _not?: Maybe<Categories_Bool_Exp>;
  readonly _or?: Maybe<ReadonlyArray<Maybe<Categories_Bool_Exp>>>;
  readonly description?: Maybe<String_Comparison_Exp>;
  readonly name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint */
  CategoryNameKey = 'Category_name_key',
  /** unique or primary key constraint */
  CategoriesPkey = 'categories_pkey',
}

export enum Categories_Enum {
  /** The culture category */
  Culture = 'CULTURE',
  /** The education category */
  Education = 'EDUCATION',
  /** The exercise category */
  Exercise = 'EXERCISE',
  /** The social category */
  Social = 'SOCIAL',
}

/** expression to compare columns of type categories_enum. All fields are combined with logical 'AND'. */
export type Categories_Enum_Comparison_Exp = {
  readonly _eq?: Maybe<Categories_Enum>;
  readonly _in?: Maybe<ReadonlyArray<Categories_Enum>>;
  readonly _is_null?: Maybe<Scalars['Boolean']>;
  readonly _neq?: Maybe<Categories_Enum>;
  readonly _nin?: Maybe<ReadonlyArray<Categories_Enum>>;
};

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  readonly __typename: 'categories_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "categories" */
export type Categories_Max_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  readonly __typename: 'categories_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "categories" */
export type Categories_Min_Order_By = {
  readonly description?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
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
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  readonly description?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Name = 'name',
}

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
  readonly category: Categories_Enum;
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
  readonly category?: Maybe<Categories_Enum_Comparison_Exp>;
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
  readonly category?: Maybe<Categories_Enum>;
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
  readonly category?: Maybe<Categories_Enum>;
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
  /** delete data from the table: "activities" */
  readonly delete_activities?: Maybe<Activities_Mutation_Response>;
  /** delete single row from the table: "activities" */
  readonly delete_activities_by_pk?: Maybe<Activities>;
  /** delete data from the table: "categories" */
  readonly delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete single row from the table: "categories" */
  readonly delete_categories_by_pk?: Maybe<Categories>;
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
  /** delete data from the table: "users" */
  readonly delete_users?: Maybe<Users_Mutation_Response>;
  /** insert data into the table: "activities" */
  readonly insert_activities?: Maybe<Activities_Mutation_Response>;
  /** insert a single row into the table: "activities" */
  readonly insert_activities_one?: Maybe<Activities>;
  /** insert data into the table: "categories" */
  readonly insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert a single row into the table: "categories" */
  readonly insert_categories_one?: Maybe<Categories>;
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
  /** insert data into the table: "users" */
  readonly insert_users?: Maybe<Users_Mutation_Response>;
  /** update data of the table: "activities" */
  readonly update_activities?: Maybe<Activities_Mutation_Response>;
  /** update single row of the table: "activities" */
  readonly update_activities_by_pk?: Maybe<Activities>;
  /** update data of the table: "categories" */
  readonly update_categories?: Maybe<Categories_Mutation_Response>;
  /** update single row of the table: "categories" */
  readonly update_categories_by_pk?: Maybe<Categories>;
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
  /** update data of the table: "users" */
  readonly update_users?: Maybe<Users_Mutation_Response>;
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
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
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
export type Mutation_RootInsert_UsersArgs = {
  objects: ReadonlyArray<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
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
  _set?: Maybe<Categories_Set_Input>;
  where: Categories_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Categories_By_PkArgs = {
  _set?: Maybe<Categories_Set_Input>;
  pk_columns: Categories_Pk_Columns_Input;
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
  /** fetch data from the table: "users" using primary key columns */
  readonly user?: Maybe<Users>;
  /** fetch data from the table: "users" */
  readonly users: ReadonlyArray<Users>;
  /** fetch aggregated fields from the table: "users" */
  readonly users_aggregate: Users_Aggregate;
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
export type Query_RootUserArgs = {
  id: Scalars['String'];
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
  /** fetch data from the table: "users" using primary key columns */
  readonly user?: Maybe<Users>;
  /** fetch data from the table: "users" */
  readonly users: ReadonlyArray<Users>;
  /** fetch aggregated fields from the table: "users" */
  readonly users_aggregate: Users_Aggregate;
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
export type Subscription_RootUserArgs = {
  id: Scalars['String'];
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
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
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
  readonly updated_at?: Maybe<Timestamptz_Comparison_Exp>;
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
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  readonly __typename: 'users_max_fields';
  readonly bio?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  readonly bio?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly email?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
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
  readonly updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  readonly bio?: Maybe<Order_By>;
  readonly created_at?: Maybe<Order_By>;
  readonly email?: Maybe<Order_By>;
  readonly id?: Maybe<Order_By>;
  readonly name?: Maybe<Order_By>;
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
  readonly updated_at?: Maybe<Order_By>;
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
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  readonly bio?: Maybe<Scalars['String']>;
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  readonly email?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
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
  UpdatedAt = 'updated_at',
}

export type BasicUserFragmentFragment = { readonly __typename: 'users' } & Pick<
  Types.Users,
  'id' | 'email' | 'name' | 'bio'
>;

export type UserFragmentFragment = { readonly __typename: 'users' } & Pick<Types.Users, 'created_at' | 'updated_at'> & {
    readonly followers: ReadonlyArray<
      { readonly __typename: 'followings' } & {
        readonly follower: { readonly __typename: 'users' } & BasicUserFragmentFragment;
      }
    >;
    readonly followers_aggregate: { readonly __typename: 'followings_aggregate' } & {
      readonly aggregate?: Types.Maybe<
        { readonly __typename: 'followings_aggregate_fields' } & Pick<Types.Followings_Aggregate_Fields, 'count'>
      >;
    };
    readonly following: ReadonlyArray<
      { readonly __typename: 'followings' } & {
        readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment;
      }
    >;
    readonly following_aggregate: { readonly __typename: 'followings_aggregate' } & {
      readonly aggregate?: Types.Maybe<
        { readonly __typename: 'followings_aggregate_fields' } & Pick<Types.Followings_Aggregate_Fields, 'count'>
      >;
    };
    readonly activities: ReadonlyArray<{ readonly __typename: 'activities' } & ActivityFragmentFragment>;
  } & BasicUserFragmentFragment;

export type ActivityFragmentFragment = { readonly __typename: 'activities' } & Pick<
  Types.Activities,
  'activity_id' | 'category' | 'caption' | 'created_at' | 'updated_at'
> & {
    readonly comments: ReadonlyArray<{ readonly __typename: 'comments' } & CommentFragmentFragment>;
    readonly geofence: { readonly __typename: 'geofences' } & GeofenceFragmentFragment;
  };

export type CommentFragmentFragment = { readonly __typename: 'comments' } & Pick<
  Types.Comments,
  'comment_id' | 'activity_id' | 'content' | 'created_at' | 'updated_at'
> & { readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment };

export type GeofenceFragmentFragment = { readonly __typename: 'geofences' } & Pick<
  Types.Geofences,
  | 'id'
  | 'name'
  | 'category'
  | 'coordinates'
  | 'description'
  | 'latitude'
  | 'longitude'
  | 'radius'
  | 'variant'
  | 'created_at'
  | 'updated_at'
>;

export const BasicUserFragmentFragmentDoc = gql`
  fragment basicUserFragment on users {
    id
    email
    name
    bio
  }
`;
export const CommentFragmentFragmentDoc = gql`
  fragment commentFragment on comments {
    comment_id
    activity_id
    content
    user {
      ...basicUserFragment
    }
    created_at
    updated_at
  }
  ${BasicUserFragmentFragmentDoc}
`;
export const GeofenceFragmentFragmentDoc = gql`
  fragment geofenceFragment on geofences {
    id
    name
    category
    coordinates
    description
    latitude
    longitude
    radius
    variant
    created_at
    updated_at
  }
`;
export const ActivityFragmentFragmentDoc = gql`
  fragment activityFragment on activities {
    activity_id
    category
    caption
    comments {
      ...commentFragment
    }
    geofence {
      ...geofenceFragment
    }
    created_at
    updated_at
  }
  ${CommentFragmentFragmentDoc}
  ${GeofenceFragmentFragmentDoc}
`;
export const UserFragmentFragmentDoc = gql`
  fragment userFragment on users {
    ...basicUserFragment
    created_at
    updated_at
    followers {
      follower {
        ...basicUserFragment
      }
    }
    followers_aggregate {
      aggregate {
        count(distinct: true, columns: user_id)
      }
    }
    following {
      user {
        ...basicUserFragment
      }
    }
    following_aggregate {
      aggregate {
        count(distinct: true, columns: user_id)
      }
    }
    activities {
      ...activityFragment
    }
  }
  ${BasicUserFragmentFragmentDoc}
  ${ActivityFragmentFragmentDoc}
`;