/* eslint-disable */
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
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "activities" */
export type Activities = {
  __typename?: 'activities';
  /** An object relationship */
  activityByCategory: Categories;
  activity_id: Scalars['Int'];
  caption?: Maybe<Scalars['String']>;
  category: Categories_Enum;
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregated array relationship */
  comments_aggregate: Comments_Aggregate;
  created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  geofence: Geofences;
  geofence_id: Scalars['Int'];
  /** An array relationship */
  likes: Array<Likes>;
  /** An aggregated array relationship */
  likes_aggregate: Likes_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** columns and relationships of "activities" */
export type ActivitiesCommentsArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** columns and relationships of "activities" */
export type ActivitiesComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** columns and relationships of "activities" */
export type ActivitiesLikesArgs = {
  distinct_on?: Maybe<Array<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** columns and relationships of "activities" */
export type ActivitiesLikes_AggregateArgs = {
  distinct_on?: Maybe<Array<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** aggregated selection of "activities" */
export type Activities_Aggregate = {
  __typename?: 'activities_aggregate';
  aggregate?: Maybe<Activities_Aggregate_Fields>;
  nodes: Array<Activities>;
};

/** aggregate fields of "activities" */
export type Activities_Aggregate_Fields = {
  __typename?: 'activities_aggregate_fields';
  avg?: Maybe<Activities_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Activities_Max_Fields>;
  min?: Maybe<Activities_Min_Fields>;
  stddev?: Maybe<Activities_Stddev_Fields>;
  stddev_pop?: Maybe<Activities_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Activities_Stddev_Samp_Fields>;
  sum?: Maybe<Activities_Sum_Fields>;
  var_pop?: Maybe<Activities_Var_Pop_Fields>;
  var_samp?: Maybe<Activities_Var_Samp_Fields>;
  variance?: Maybe<Activities_Variance_Fields>;
};

/** aggregate fields of "activities" */
export type Activities_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Activities_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "activities" */
export type Activities_Aggregate_Order_By = {
  avg?: Maybe<Activities_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Activities_Max_Order_By>;
  min?: Maybe<Activities_Min_Order_By>;
  stddev?: Maybe<Activities_Stddev_Order_By>;
  stddev_pop?: Maybe<Activities_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Activities_Stddev_Samp_Order_By>;
  sum?: Maybe<Activities_Sum_Order_By>;
  var_pop?: Maybe<Activities_Var_Pop_Order_By>;
  var_samp?: Maybe<Activities_Var_Samp_Order_By>;
  variance?: Maybe<Activities_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "activities" */
export type Activities_Arr_Rel_Insert_Input = {
  data: Array<Activities_Insert_Input>;
  on_conflict?: Maybe<Activities_On_Conflict>;
};

/** aggregate avg on columns */
export type Activities_Avg_Fields = {
  __typename?: 'activities_avg_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "activities" */
export type Activities_Avg_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "activities". All fields are combined with a logical 'AND'. */
export type Activities_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Activities_Bool_Exp>>>;
  _not?: Maybe<Activities_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Activities_Bool_Exp>>>;
  activityByCategory?: Maybe<Categories_Bool_Exp>;
  activity_id?: Maybe<Int_Comparison_Exp>;
  caption?: Maybe<String_Comparison_Exp>;
  category?: Maybe<Categories_Enum_Comparison_Exp>;
  comments?: Maybe<Comments_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  geofence?: Maybe<Geofences_Bool_Exp>;
  geofence_id?: Maybe<Int_Comparison_Exp>;
  likes?: Maybe<Likes_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "activities" */
export enum Activities_Constraint {
  /** unique or primary key constraint */
  ActivityPkey = 'Activity_pkey',
}

/** input type for incrementing integer column in table "activities" */
export type Activities_Inc_Input = {
  activity_id?: Maybe<Scalars['Int']>;
  geofence_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "activities" */
export type Activities_Insert_Input = {
  activityByCategory?: Maybe<Categories_Obj_Rel_Insert_Input>;
  activity_id?: Maybe<Scalars['Int']>;
  caption?: Maybe<Scalars['String']>;
  category?: Maybe<Categories_Enum>;
  comments?: Maybe<Comments_Arr_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  geofence?: Maybe<Geofences_Obj_Rel_Insert_Input>;
  geofence_id?: Maybe<Scalars['Int']>;
  likes?: Maybe<Likes_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Activities_Max_Fields = {
  __typename?: 'activities_max_fields';
  activity_id?: Maybe<Scalars['Int']>;
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  geofence_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "activities" */
export type Activities_Max_Order_By = {
  activity_id?: Maybe<Order_By>;
  caption?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Activities_Min_Fields = {
  __typename?: 'activities_min_fields';
  activity_id?: Maybe<Scalars['Int']>;
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  geofence_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "activities" */
export type Activities_Min_Order_By = {
  activity_id?: Maybe<Order_By>;
  caption?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "activities" */
export type Activities_Mutation_Response = {
  __typename?: 'activities_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Activities>;
};

/** input type for inserting object relation for remote table "activities" */
export type Activities_Obj_Rel_Insert_Input = {
  data: Activities_Insert_Input;
  on_conflict?: Maybe<Activities_On_Conflict>;
};

/** on conflict condition type for table "activities" */
export type Activities_On_Conflict = {
  constraint: Activities_Constraint;
  update_columns: Array<Activities_Update_Column>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** ordering options when selecting data from "activities" */
export type Activities_Order_By = {
  activityByCategory?: Maybe<Categories_Order_By>;
  activity_id?: Maybe<Order_By>;
  caption?: Maybe<Order_By>;
  category?: Maybe<Order_By>;
  comments_aggregate?: Maybe<Comments_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  geofence?: Maybe<Geofences_Order_By>;
  geofence_id?: Maybe<Order_By>;
  likes_aggregate?: Maybe<Likes_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "activities" */
export type Activities_Pk_Columns_Input = {
  activity_id: Scalars['Int'];
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
  activity_id?: Maybe<Scalars['Int']>;
  caption?: Maybe<Scalars['String']>;
  category?: Maybe<Categories_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  geofence_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Activities_Stddev_Fields = {
  __typename?: 'activities_stddev_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "activities" */
export type Activities_Stddev_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Activities_Stddev_Pop_Fields = {
  __typename?: 'activities_stddev_pop_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "activities" */
export type Activities_Stddev_Pop_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Activities_Stddev_Samp_Fields = {
  __typename?: 'activities_stddev_samp_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "activities" */
export type Activities_Stddev_Samp_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Activities_Sum_Fields = {
  __typename?: 'activities_sum_fields';
  activity_id?: Maybe<Scalars['Int']>;
  geofence_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "activities" */
export type Activities_Sum_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
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
  __typename?: 'activities_var_pop_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "activities" */
export type Activities_Var_Pop_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Activities_Var_Samp_Fields = {
  __typename?: 'activities_var_samp_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "activities" */
export type Activities_Var_Samp_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Activities_Variance_Fields = {
  __typename?: 'activities_variance_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "activities" */
export type Activities_Variance_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
};

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories';
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  __typename?: 'categories_aggregate';
  aggregate?: Maybe<Categories_Aggregate_Fields>;
  nodes: Array<Categories>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  __typename?: 'categories_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Categories_Max_Fields>;
  min?: Maybe<Categories_Min_Fields>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Categories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "categories" */
export type Categories_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Categories_Max_Order_By>;
  min?: Maybe<Categories_Min_Order_By>;
};

/** input type for inserting array relation for remote table "categories" */
export type Categories_Arr_Rel_Insert_Input = {
  data: Array<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Categories_Bool_Exp>>>;
  _not?: Maybe<Categories_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Categories_Bool_Exp>>>;
  description?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
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
  _eq?: Maybe<Categories_Enum>;
  _in?: Maybe<Array<Categories_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Categories_Enum>;
  _nin?: Maybe<Array<Categories_Enum>>;
};

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  __typename?: 'categories_max_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "categories" */
export type Categories_Max_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  __typename?: 'categories_min_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "categories" */
export type Categories_Min_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  __typename?: 'categories_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Categories>;
};

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** on conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint;
  update_columns: Array<Categories_Update_Column>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** ordering options when selecting data from "categories" */
export type Categories_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "categories" */
export type Categories_Pk_Columns_Input = {
  name: Scalars['String'];
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
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  __typename?: 'comments';
  /** An object relationship */
  activity: Activities;
  activity_id: Scalars['Int'];
  comment_id: Scalars['Int'];
  content: Scalars['String'];
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "comments" */
export type Comments_Aggregate = {
  __typename?: 'comments_aggregate';
  aggregate?: Maybe<Comments_Aggregate_Fields>;
  nodes: Array<Comments>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_Fields = {
  __typename?: 'comments_aggregate_fields';
  avg?: Maybe<Comments_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Comments_Max_Fields>;
  min?: Maybe<Comments_Min_Fields>;
  stddev?: Maybe<Comments_Stddev_Fields>;
  stddev_pop?: Maybe<Comments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Comments_Stddev_Samp_Fields>;
  sum?: Maybe<Comments_Sum_Fields>;
  var_pop?: Maybe<Comments_Var_Pop_Fields>;
  var_samp?: Maybe<Comments_Var_Samp_Fields>;
  variance?: Maybe<Comments_Variance_Fields>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Comments_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "comments" */
export type Comments_Aggregate_Order_By = {
  avg?: Maybe<Comments_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Comments_Max_Order_By>;
  min?: Maybe<Comments_Min_Order_By>;
  stddev?: Maybe<Comments_Stddev_Order_By>;
  stddev_pop?: Maybe<Comments_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Comments_Stddev_Samp_Order_By>;
  sum?: Maybe<Comments_Sum_Order_By>;
  var_pop?: Maybe<Comments_Var_Pop_Order_By>;
  var_samp?: Maybe<Comments_Var_Samp_Order_By>;
  variance?: Maybe<Comments_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "comments" */
export type Comments_Arr_Rel_Insert_Input = {
  data: Array<Comments_Insert_Input>;
  on_conflict?: Maybe<Comments_On_Conflict>;
};

/** aggregate avg on columns */
export type Comments_Avg_Fields = {
  __typename?: 'comments_avg_fields';
  activity_id?: Maybe<Scalars['Float']>;
  comment_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "comments" */
export type Comments_Avg_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "comments". All fields are combined with a logical 'AND'. */
export type Comments_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Comments_Bool_Exp>>>;
  _not?: Maybe<Comments_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Comments_Bool_Exp>>>;
  activity?: Maybe<Activities_Bool_Exp>;
  activity_id?: Maybe<Int_Comparison_Exp>;
  comment_id?: Maybe<Int_Comparison_Exp>;
  content?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  updated_at?: Maybe<Timestamp_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "comments" */
export enum Comments_Constraint {
  /** unique or primary key constraint */
  CommentsPkey = 'Comments_pkey',
}

/** input type for incrementing integer column in table "comments" */
export type Comments_Inc_Input = {
  activity_id?: Maybe<Scalars['Int']>;
  comment_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "comments" */
export type Comments_Insert_Input = {
  activity?: Maybe<Activities_Obj_Rel_Insert_Input>;
  activity_id?: Maybe<Scalars['Int']>;
  comment_id?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Comments_Max_Fields = {
  __typename?: 'comments_max_fields';
  activity_id?: Maybe<Scalars['Int']>;
  comment_id?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "comments" */
export type Comments_Max_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
  content?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Comments_Min_Fields = {
  __typename?: 'comments_min_fields';
  activity_id?: Maybe<Scalars['Int']>;
  comment_id?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "comments" */
export type Comments_Min_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
  content?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "comments" */
export type Comments_Mutation_Response = {
  __typename?: 'comments_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Comments>;
};

/** input type for inserting object relation for remote table "comments" */
export type Comments_Obj_Rel_Insert_Input = {
  data: Comments_Insert_Input;
  on_conflict?: Maybe<Comments_On_Conflict>;
};

/** on conflict condition type for table "comments" */
export type Comments_On_Conflict = {
  constraint: Comments_Constraint;
  update_columns: Array<Comments_Update_Column>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** ordering options when selecting data from "comments" */
export type Comments_Order_By = {
  activity?: Maybe<Activities_Order_By>;
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
  content?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "comments" */
export type Comments_Pk_Columns_Input = {
  comment_id: Scalars['Int'];
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
  activity_id?: Maybe<Scalars['Int']>;
  comment_id?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamp']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Comments_Stddev_Fields = {
  __typename?: 'comments_stddev_fields';
  activity_id?: Maybe<Scalars['Float']>;
  comment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "comments" */
export type Comments_Stddev_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Comments_Stddev_Pop_Fields = {
  __typename?: 'comments_stddev_pop_fields';
  activity_id?: Maybe<Scalars['Float']>;
  comment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "comments" */
export type Comments_Stddev_Pop_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Comments_Stddev_Samp_Fields = {
  __typename?: 'comments_stddev_samp_fields';
  activity_id?: Maybe<Scalars['Float']>;
  comment_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "comments" */
export type Comments_Stddev_Samp_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Comments_Sum_Fields = {
  __typename?: 'comments_sum_fields';
  activity_id?: Maybe<Scalars['Int']>;
  comment_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "comments" */
export type Comments_Sum_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
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
  __typename?: 'comments_var_pop_fields';
  activity_id?: Maybe<Scalars['Float']>;
  comment_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "comments" */
export type Comments_Var_Pop_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Comments_Var_Samp_Fields = {
  __typename?: 'comments_var_samp_fields';
  activity_id?: Maybe<Scalars['Float']>;
  comment_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "comments" */
export type Comments_Var_Samp_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Comments_Variance_Fields = {
  __typename?: 'comments_variance_fields';
  activity_id?: Maybe<Scalars['Float']>;
  comment_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "comments" */
export type Comments_Variance_Order_By = {
  activity_id?: Maybe<Order_By>;
  comment_id?: Maybe<Order_By>;
};

/** expression to compare columns of type float8. All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: Maybe<Scalars['float8']>;
  _gt?: Maybe<Scalars['float8']>;
  _gte?: Maybe<Scalars['float8']>;
  _in?: Maybe<Array<Scalars['float8']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['float8']>;
  _lte?: Maybe<Scalars['float8']>;
  _neq?: Maybe<Scalars['float8']>;
  _nin?: Maybe<Array<Scalars['float8']>>;
};

/** columns and relationships of "followings" */
export type Followings = {
  __typename?: 'followings';
  created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  follower: Users;
  following_id: Scalars['String'];
  updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "followings" */
export type Followings_Aggregate = {
  __typename?: 'followings_aggregate';
  aggregate?: Maybe<Followings_Aggregate_Fields>;
  nodes: Array<Followings>;
};

/** aggregate fields of "followings" */
export type Followings_Aggregate_Fields = {
  __typename?: 'followings_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Followings_Max_Fields>;
  min?: Maybe<Followings_Min_Fields>;
};

/** aggregate fields of "followings" */
export type Followings_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Followings_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "followings" */
export type Followings_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Followings_Max_Order_By>;
  min?: Maybe<Followings_Min_Order_By>;
};

/** input type for inserting array relation for remote table "followings" */
export type Followings_Arr_Rel_Insert_Input = {
  data: Array<Followings_Insert_Input>;
  on_conflict?: Maybe<Followings_On_Conflict>;
};

/** Boolean expression to filter rows from the table "followings". All fields are combined with a logical 'AND'. */
export type Followings_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Followings_Bool_Exp>>>;
  _not?: Maybe<Followings_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Followings_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  follower?: Maybe<Users_Bool_Exp>;
  following_id?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "followings" */
export enum Followings_Constraint {
  /** unique or primary key constraint */
  FollowingsPkey = 'Followings_pkey',
}

/** input type for inserting data into table "followings" */
export type Followings_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  follower?: Maybe<Users_Obj_Rel_Insert_Input>;
  following_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Followings_Max_Fields = {
  __typename?: 'followings_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  following_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "followings" */
export type Followings_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  following_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Followings_Min_Fields = {
  __typename?: 'followings_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  following_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "followings" */
export type Followings_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  following_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "followings" */
export type Followings_Mutation_Response = {
  __typename?: 'followings_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Followings>;
};

/** input type for inserting object relation for remote table "followings" */
export type Followings_Obj_Rel_Insert_Input = {
  data: Followings_Insert_Input;
  on_conflict?: Maybe<Followings_On_Conflict>;
};

/** on conflict condition type for table "followings" */
export type Followings_On_Conflict = {
  constraint: Followings_Constraint;
  update_columns: Array<Followings_Update_Column>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** ordering options when selecting data from "followings" */
export type Followings_Order_By = {
  created_at?: Maybe<Order_By>;
  follower?: Maybe<Users_Order_By>;
  following_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "followings" */
export type Followings_Pk_Columns_Input = {
  following_id: Scalars['String'];
  user_id: Scalars['String'];
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
  created_at?: Maybe<Scalars['timestamptz']>;
  following_id?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
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
  __typename?: 'geofence_variants';
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** aggregated selection of "geofence_variants" */
export type Geofence_Variants_Aggregate = {
  __typename?: 'geofence_variants_aggregate';
  aggregate?: Maybe<Geofence_Variants_Aggregate_Fields>;
  nodes: Array<Geofence_Variants>;
};

/** aggregate fields of "geofence_variants" */
export type Geofence_Variants_Aggregate_Fields = {
  __typename?: 'geofence_variants_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Geofence_Variants_Max_Fields>;
  min?: Maybe<Geofence_Variants_Min_Fields>;
};

/** aggregate fields of "geofence_variants" */
export type Geofence_Variants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Geofence_Variants_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "geofence_variants" */
export type Geofence_Variants_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Geofence_Variants_Max_Order_By>;
  min?: Maybe<Geofence_Variants_Min_Order_By>;
};

/** input type for inserting array relation for remote table "geofence_variants" */
export type Geofence_Variants_Arr_Rel_Insert_Input = {
  data: Array<Geofence_Variants_Insert_Input>;
  on_conflict?: Maybe<Geofence_Variants_On_Conflict>;
};

/** Boolean expression to filter rows from the table "geofence_variants". All fields are combined with a logical 'AND'. */
export type Geofence_Variants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Geofence_Variants_Bool_Exp>>>;
  _not?: Maybe<Geofence_Variants_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Geofence_Variants_Bool_Exp>>>;
  description?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
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
  _eq?: Maybe<Geofence_Variants_Enum>;
  _in?: Maybe<Array<Geofence_Variants_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Geofence_Variants_Enum>;
  _nin?: Maybe<Array<Geofence_Variants_Enum>>;
};

/** input type for inserting data into table "geofence_variants" */
export type Geofence_Variants_Insert_Input = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Geofence_Variants_Max_Fields = {
  __typename?: 'geofence_variants_max_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "geofence_variants" */
export type Geofence_Variants_Max_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Geofence_Variants_Min_Fields = {
  __typename?: 'geofence_variants_min_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "geofence_variants" */
export type Geofence_Variants_Min_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "geofence_variants" */
export type Geofence_Variants_Mutation_Response = {
  __typename?: 'geofence_variants_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Geofence_Variants>;
};

/** input type for inserting object relation for remote table "geofence_variants" */
export type Geofence_Variants_Obj_Rel_Insert_Input = {
  data: Geofence_Variants_Insert_Input;
  on_conflict?: Maybe<Geofence_Variants_On_Conflict>;
};

/** on conflict condition type for table "geofence_variants" */
export type Geofence_Variants_On_Conflict = {
  constraint: Geofence_Variants_Constraint;
  update_columns: Array<Geofence_Variants_Update_Column>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** ordering options when selecting data from "geofence_variants" */
export type Geofence_Variants_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "geofence_variants" */
export type Geofence_Variants_Pk_Columns_Input = {
  name: Scalars['String'];
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
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  __typename?: 'geofences';
  category: Categories_Enum;
  /** Only for polygons */
  coordinates?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  latitude: Scalars['float8'];
  longitude: Scalars['float8'];
  name: Scalars['String'];
  radius: Scalars['float8'];
  updated_at: Scalars['timestamptz'];
  variant: Geofence_Variants_Enum;
};

/** aggregated selection of "geofences" */
export type Geofences_Aggregate = {
  __typename?: 'geofences_aggregate';
  aggregate?: Maybe<Geofences_Aggregate_Fields>;
  nodes: Array<Geofences>;
};

/** aggregate fields of "geofences" */
export type Geofences_Aggregate_Fields = {
  __typename?: 'geofences_aggregate_fields';
  avg?: Maybe<Geofences_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Geofences_Max_Fields>;
  min?: Maybe<Geofences_Min_Fields>;
  stddev?: Maybe<Geofences_Stddev_Fields>;
  stddev_pop?: Maybe<Geofences_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Geofences_Stddev_Samp_Fields>;
  sum?: Maybe<Geofences_Sum_Fields>;
  var_pop?: Maybe<Geofences_Var_Pop_Fields>;
  var_samp?: Maybe<Geofences_Var_Samp_Fields>;
  variance?: Maybe<Geofences_Variance_Fields>;
};

/** aggregate fields of "geofences" */
export type Geofences_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Geofences_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "geofences" */
export type Geofences_Aggregate_Order_By = {
  avg?: Maybe<Geofences_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Geofences_Max_Order_By>;
  min?: Maybe<Geofences_Min_Order_By>;
  stddev?: Maybe<Geofences_Stddev_Order_By>;
  stddev_pop?: Maybe<Geofences_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Geofences_Stddev_Samp_Order_By>;
  sum?: Maybe<Geofences_Sum_Order_By>;
  var_pop?: Maybe<Geofences_Var_Pop_Order_By>;
  var_samp?: Maybe<Geofences_Var_Samp_Order_By>;
  variance?: Maybe<Geofences_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "geofences" */
export type Geofences_Arr_Rel_Insert_Input = {
  data: Array<Geofences_Insert_Input>;
  on_conflict?: Maybe<Geofences_On_Conflict>;
};

/** aggregate avg on columns */
export type Geofences_Avg_Fields = {
  __typename?: 'geofences_avg_fields';
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "geofences" */
export type Geofences_Avg_Order_By = {
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "geofences". All fields are combined with a logical 'AND'. */
export type Geofences_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Geofences_Bool_Exp>>>;
  _not?: Maybe<Geofences_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Geofences_Bool_Exp>>>;
  category?: Maybe<Categories_Enum_Comparison_Exp>;
  coordinates?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  latitude?: Maybe<Float8_Comparison_Exp>;
  longitude?: Maybe<Float8_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  radius?: Maybe<Float8_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  variant?: Maybe<Geofence_Variants_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "geofences" */
export enum Geofences_Constraint {
  /** unique or primary key constraint */
  GeofencesPkey = 'geofences_pkey',
}

/** input type for incrementing integer column in table "geofences" */
export type Geofences_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  radius?: Maybe<Scalars['float8']>;
};

/** input type for inserting data into table "geofences" */
export type Geofences_Insert_Input = {
  category?: Maybe<Categories_Enum>;
  coordinates?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['float8']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  variant?: Maybe<Geofence_Variants_Enum>;
};

/** aggregate max on columns */
export type Geofences_Max_Fields = {
  __typename?: 'geofences_max_fields';
  coordinates?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['float8']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "geofences" */
export type Geofences_Max_Order_By = {
  coordinates?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Geofences_Min_Fields = {
  __typename?: 'geofences_min_fields';
  coordinates?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['float8']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "geofences" */
export type Geofences_Min_Order_By = {
  coordinates?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "geofences" */
export type Geofences_Mutation_Response = {
  __typename?: 'geofences_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Geofences>;
};

/** input type for inserting object relation for remote table "geofences" */
export type Geofences_Obj_Rel_Insert_Input = {
  data: Geofences_Insert_Input;
  on_conflict?: Maybe<Geofences_On_Conflict>;
};

/** on conflict condition type for table "geofences" */
export type Geofences_On_Conflict = {
  constraint: Geofences_Constraint;
  update_columns: Array<Geofences_Update_Column>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** ordering options when selecting data from "geofences" */
export type Geofences_Order_By = {
  category?: Maybe<Order_By>;
  coordinates?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  variant?: Maybe<Order_By>;
};

/** primary key columns input for table: "geofences" */
export type Geofences_Pk_Columns_Input = {
  id: Scalars['Int'];
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
  category?: Maybe<Categories_Enum>;
  coordinates?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  name?: Maybe<Scalars['String']>;
  radius?: Maybe<Scalars['float8']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  variant?: Maybe<Geofence_Variants_Enum>;
};

/** aggregate stddev on columns */
export type Geofences_Stddev_Fields = {
  __typename?: 'geofences_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "geofences" */
export type Geofences_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Geofences_Stddev_Pop_Fields = {
  __typename?: 'geofences_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "geofences" */
export type Geofences_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Geofences_Stddev_Samp_Fields = {
  __typename?: 'geofences_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "geofences" */
export type Geofences_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Geofences_Sum_Fields = {
  __typename?: 'geofences_sum_fields';
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  radius?: Maybe<Scalars['float8']>;
};

/** order by sum() on columns of table "geofences" */
export type Geofences_Sum_Order_By = {
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
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
  __typename?: 'geofences_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "geofences" */
export type Geofences_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Geofences_Var_Samp_Fields = {
  __typename?: 'geofences_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "geofences" */
export type Geofences_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Geofences_Variance_Fields = {
  __typename?: 'geofences_variance_fields';
  id?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  radius?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "geofences" */
export type Geofences_Variance_Order_By = {
  id?: Maybe<Order_By>;
  latitude?: Maybe<Order_By>;
  longitude?: Maybe<Order_By>;
  radius?: Maybe<Order_By>;
};

/** columns and relationships of "likes" */
export type Likes = {
  __typename?: 'likes';
  activity_id: Scalars['Int'];
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id: Scalars['String'];
};

/** aggregated selection of "likes" */
export type Likes_Aggregate = {
  __typename?: 'likes_aggregate';
  aggregate?: Maybe<Likes_Aggregate_Fields>;
  nodes: Array<Likes>;
};

/** aggregate fields of "likes" */
export type Likes_Aggregate_Fields = {
  __typename?: 'likes_aggregate_fields';
  avg?: Maybe<Likes_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Likes_Max_Fields>;
  min?: Maybe<Likes_Min_Fields>;
  stddev?: Maybe<Likes_Stddev_Fields>;
  stddev_pop?: Maybe<Likes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Likes_Stddev_Samp_Fields>;
  sum?: Maybe<Likes_Sum_Fields>;
  var_pop?: Maybe<Likes_Var_Pop_Fields>;
  var_samp?: Maybe<Likes_Var_Samp_Fields>;
  variance?: Maybe<Likes_Variance_Fields>;
};

/** aggregate fields of "likes" */
export type Likes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Likes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "likes" */
export type Likes_Aggregate_Order_By = {
  avg?: Maybe<Likes_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Likes_Max_Order_By>;
  min?: Maybe<Likes_Min_Order_By>;
  stddev?: Maybe<Likes_Stddev_Order_By>;
  stddev_pop?: Maybe<Likes_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Likes_Stddev_Samp_Order_By>;
  sum?: Maybe<Likes_Sum_Order_By>;
  var_pop?: Maybe<Likes_Var_Pop_Order_By>;
  var_samp?: Maybe<Likes_Var_Samp_Order_By>;
  variance?: Maybe<Likes_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "likes" */
export type Likes_Arr_Rel_Insert_Input = {
  data: Array<Likes_Insert_Input>;
  on_conflict?: Maybe<Likes_On_Conflict>;
};

/** aggregate avg on columns */
export type Likes_Avg_Fields = {
  __typename?: 'likes_avg_fields';
  activity_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "likes" */
export type Likes_Avg_Order_By = {
  activity_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "likes". All fields are combined with a logical 'AND'. */
export type Likes_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Likes_Bool_Exp>>>;
  _not?: Maybe<Likes_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Likes_Bool_Exp>>>;
  activity_id?: Maybe<Int_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
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
  activity_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "likes" */
export type Likes_Insert_Input = {
  activity_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Likes_Max_Fields = {
  __typename?: 'likes_max_fields';
  activity_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "likes" */
export type Likes_Max_Order_By = {
  activity_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Likes_Min_Fields = {
  __typename?: 'likes_min_fields';
  activity_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "likes" */
export type Likes_Min_Order_By = {
  activity_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "likes" */
export type Likes_Mutation_Response = {
  __typename?: 'likes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Likes>;
};

/** input type for inserting object relation for remote table "likes" */
export type Likes_Obj_Rel_Insert_Input = {
  data: Likes_Insert_Input;
  on_conflict?: Maybe<Likes_On_Conflict>;
};

/** on conflict condition type for table "likes" */
export type Likes_On_Conflict = {
  constraint: Likes_Constraint;
  update_columns: Array<Likes_Update_Column>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** ordering options when selecting data from "likes" */
export type Likes_Order_By = {
  activity_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "likes" */
export type Likes_Pk_Columns_Input = {
  activity_id: Scalars['Int'];
  user_id: Scalars['String'];
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
  activity_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Likes_Stddev_Fields = {
  __typename?: 'likes_stddev_fields';
  activity_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "likes" */
export type Likes_Stddev_Order_By = {
  activity_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Likes_Stddev_Pop_Fields = {
  __typename?: 'likes_stddev_pop_fields';
  activity_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "likes" */
export type Likes_Stddev_Pop_Order_By = {
  activity_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Likes_Stddev_Samp_Fields = {
  __typename?: 'likes_stddev_samp_fields';
  activity_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "likes" */
export type Likes_Stddev_Samp_Order_By = {
  activity_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Likes_Sum_Fields = {
  __typename?: 'likes_sum_fields';
  activity_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "likes" */
export type Likes_Sum_Order_By = {
  activity_id?: Maybe<Order_By>;
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
  __typename?: 'likes_var_pop_fields';
  activity_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "likes" */
export type Likes_Var_Pop_Order_By = {
  activity_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Likes_Var_Samp_Fields = {
  __typename?: 'likes_var_samp_fields';
  activity_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "likes" */
export type Likes_Var_Samp_Order_By = {
  activity_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Likes_Variance_Fields = {
  __typename?: 'likes_variance_fields';
  activity_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "likes" */
export type Likes_Variance_Order_By = {
  activity_id?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "activities" */
  delete_activities?: Maybe<Activities_Mutation_Response>;
  /** delete single row from the table: "activities" */
  delete_activities_by_pk?: Maybe<Activities>;
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete single row from the table: "categories" */
  delete_categories_by_pk?: Maybe<Categories>;
  /** delete data from the table: "comments" */
  delete_comments?: Maybe<Comments_Mutation_Response>;
  /** delete single row from the table: "comments" */
  delete_comments_by_pk?: Maybe<Comments>;
  /** delete data from the table: "followings" */
  delete_followings?: Maybe<Followings_Mutation_Response>;
  /** delete single row from the table: "followings" */
  delete_followings_by_pk?: Maybe<Followings>;
  /** delete data from the table: "geofence_variants" */
  delete_geofence_variants?: Maybe<Geofence_Variants_Mutation_Response>;
  /** delete single row from the table: "geofence_variants" */
  delete_geofence_variants_by_pk?: Maybe<Geofence_Variants>;
  /** delete data from the table: "geofences" */
  delete_geofences?: Maybe<Geofences_Mutation_Response>;
  /** delete single row from the table: "geofences" */
  delete_geofences_by_pk?: Maybe<Geofences>;
  /** delete data from the table: "likes" */
  delete_likes?: Maybe<Likes_Mutation_Response>;
  /** delete single row from the table: "likes" */
  delete_likes_by_pk?: Maybe<Likes>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "activities" */
  insert_activities?: Maybe<Activities_Mutation_Response>;
  /** insert a single row into the table: "activities" */
  insert_activities_one?: Maybe<Activities>;
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert a single row into the table: "categories" */
  insert_categories_one?: Maybe<Categories>;
  /** insert data into the table: "comments" */
  insert_comments?: Maybe<Comments_Mutation_Response>;
  /** insert a single row into the table: "comments" */
  insert_comments_one?: Maybe<Comments>;
  /** insert data into the table: "followings" */
  insert_followings?: Maybe<Followings_Mutation_Response>;
  /** insert a single row into the table: "followings" */
  insert_followings_one?: Maybe<Followings>;
  /** insert data into the table: "geofence_variants" */
  insert_geofence_variants?: Maybe<Geofence_Variants_Mutation_Response>;
  /** insert a single row into the table: "geofence_variants" */
  insert_geofence_variants_one?: Maybe<Geofence_Variants>;
  /** insert data into the table: "geofences" */
  insert_geofences?: Maybe<Geofences_Mutation_Response>;
  /** insert a single row into the table: "geofences" */
  insert_geofences_one?: Maybe<Geofences>;
  /** insert data into the table: "likes" */
  insert_likes?: Maybe<Likes_Mutation_Response>;
  /** insert a single row into the table: "likes" */
  insert_likes_one?: Maybe<Likes>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "activities" */
  update_activities?: Maybe<Activities_Mutation_Response>;
  /** update single row of the table: "activities" */
  update_activities_by_pk?: Maybe<Activities>;
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>;
  /** update single row of the table: "categories" */
  update_categories_by_pk?: Maybe<Categories>;
  /** update data of the table: "comments" */
  update_comments?: Maybe<Comments_Mutation_Response>;
  /** update single row of the table: "comments" */
  update_comments_by_pk?: Maybe<Comments>;
  /** update data of the table: "followings" */
  update_followings?: Maybe<Followings_Mutation_Response>;
  /** update single row of the table: "followings" */
  update_followings_by_pk?: Maybe<Followings>;
  /** update data of the table: "geofence_variants" */
  update_geofence_variants?: Maybe<Geofence_Variants_Mutation_Response>;
  /** update single row of the table: "geofence_variants" */
  update_geofence_variants_by_pk?: Maybe<Geofence_Variants>;
  /** update data of the table: "geofences" */
  update_geofences?: Maybe<Geofences_Mutation_Response>;
  /** update single row of the table: "geofences" */
  update_geofences_by_pk?: Maybe<Geofences>;
  /** update data of the table: "likes" */
  update_likes?: Maybe<Likes_Mutation_Response>;
  /** update single row of the table: "likes" */
  update_likes_by_pk?: Maybe<Likes>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
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
export type Mutation_RootDelete_CommentsArgs = {
  where: Comments_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Comments_By_PkArgs = {
  comment_id: Scalars['Int'];
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
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootInsert_ActivitiesArgs = {
  objects: Array<Activities_Insert_Input>;
  on_conflict?: Maybe<Activities_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Activities_OneArgs = {
  object: Activities_Insert_Input;
  on_conflict?: Maybe<Activities_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Categories_OneArgs = {
  object: Categories_Insert_Input;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_CommentsArgs = {
  objects: Array<Comments_Insert_Input>;
  on_conflict?: Maybe<Comments_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Comments_OneArgs = {
  object: Comments_Insert_Input;
  on_conflict?: Maybe<Comments_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_FollowingsArgs = {
  objects: Array<Followings_Insert_Input>;
  on_conflict?: Maybe<Followings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Followings_OneArgs = {
  object: Followings_Insert_Input;
  on_conflict?: Maybe<Followings_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Geofence_VariantsArgs = {
  objects: Array<Geofence_Variants_Insert_Input>;
  on_conflict?: Maybe<Geofence_Variants_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Geofence_Variants_OneArgs = {
  object: Geofence_Variants_Insert_Input;
  on_conflict?: Maybe<Geofence_Variants_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GeofencesArgs = {
  objects: Array<Geofences_Insert_Input>;
  on_conflict?: Maybe<Geofences_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Geofences_OneArgs = {
  object: Geofences_Insert_Input;
  on_conflict?: Maybe<Geofences_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_LikesArgs = {
  objects: Array<Likes_Insert_Input>;
  on_conflict?: Maybe<Likes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Likes_OneArgs = {
  object: Likes_Insert_Input;
  on_conflict?: Maybe<Likes_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
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
export type Mutation_RootUpdate_CommentsArgs = {
  _inc?: Maybe<Comments_Inc_Input>;
  _set?: Maybe<Comments_Set_Input>;
  where: Comments_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Comments_By_PkArgs = {
  _inc?: Maybe<Comments_Inc_Input>;
  _set?: Maybe<Comments_Set_Input>;
  pk_columns: Comments_Pk_Columns_Input;
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
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
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
  __typename?: 'query_root';
  /** fetch data from the table: "activities" */
  activities: Array<Activities>;
  /** fetch aggregated fields from the table: "activities" */
  activities_aggregate: Activities_Aggregate;
  /** fetch data from the table: "activities" using primary key columns */
  activities_by_pk?: Maybe<Activities>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** fetch data from the table: "followings" */
  followings: Array<Followings>;
  /** fetch aggregated fields from the table: "followings" */
  followings_aggregate: Followings_Aggregate;
  /** fetch data from the table: "followings" using primary key columns */
  followings_by_pk?: Maybe<Followings>;
  /** fetch data from the table: "geofence_variants" */
  geofence_variants: Array<Geofence_Variants>;
  /** fetch aggregated fields from the table: "geofence_variants" */
  geofence_variants_aggregate: Geofence_Variants_Aggregate;
  /** fetch data from the table: "geofence_variants" using primary key columns */
  geofence_variants_by_pk?: Maybe<Geofence_Variants>;
  /** fetch data from the table: "geofences" */
  geofences: Array<Geofences>;
  /** fetch aggregated fields from the table: "geofences" */
  geofences_aggregate: Geofences_Aggregate;
  /** fetch data from the table: "geofences" using primary key columns */
  geofences_by_pk?: Maybe<Geofences>;
  /** fetch data from the table: "likes" */
  likes: Array<Likes>;
  /** fetch aggregated fields from the table: "likes" */
  likes_aggregate: Likes_Aggregate;
  /** fetch data from the table: "likes" using primary key columns */
  likes_by_pk?: Maybe<Likes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};

/** query root */
export type Query_RootActivitiesArgs = {
  distinct_on?: Maybe<Array<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** query root */
export type Query_RootActivities_AggregateArgs = {
  distinct_on?: Maybe<Array<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** query root */
export type Query_RootActivities_By_PkArgs = {
  activity_id: Scalars['Int'];
};

/** query root */
export type Query_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** query root */
export type Query_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** query root */
export type Query_RootCategories_By_PkArgs = {
  name: Scalars['String'];
};

/** query root */
export type Query_RootCommentsArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** query root */
export type Query_RootComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** query root */
export type Query_RootComments_By_PkArgs = {
  comment_id: Scalars['Int'];
};

/** query root */
export type Query_RootFollowingsArgs = {
  distinct_on?: Maybe<Array<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** query root */
export type Query_RootFollowings_AggregateArgs = {
  distinct_on?: Maybe<Array<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** query root */
export type Query_RootFollowings_By_PkArgs = {
  following_id: Scalars['String'];
  user_id: Scalars['String'];
};

/** query root */
export type Query_RootGeofence_VariantsArgs = {
  distinct_on?: Maybe<Array<Geofence_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofence_Variants_Order_By>>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** query root */
export type Query_RootGeofence_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Geofence_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofence_Variants_Order_By>>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** query root */
export type Query_RootGeofence_Variants_By_PkArgs = {
  name: Scalars['String'];
};

/** query root */
export type Query_RootGeofencesArgs = {
  distinct_on?: Maybe<Array<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** query root */
export type Query_RootGeofences_AggregateArgs = {
  distinct_on?: Maybe<Array<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** query root */
export type Query_RootGeofences_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootLikesArgs = {
  distinct_on?: Maybe<Array<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** query root */
export type Query_RootLikes_AggregateArgs = {
  distinct_on?: Maybe<Array<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** query root */
export type Query_RootLikes_By_PkArgs = {
  activity_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "activities" */
  activities: Array<Activities>;
  /** fetch aggregated fields from the table: "activities" */
  activities_aggregate: Activities_Aggregate;
  /** fetch data from the table: "activities" using primary key columns */
  activities_by_pk?: Maybe<Activities>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** fetch data from the table: "followings" */
  followings: Array<Followings>;
  /** fetch aggregated fields from the table: "followings" */
  followings_aggregate: Followings_Aggregate;
  /** fetch data from the table: "followings" using primary key columns */
  followings_by_pk?: Maybe<Followings>;
  /** fetch data from the table: "geofence_variants" */
  geofence_variants: Array<Geofence_Variants>;
  /** fetch aggregated fields from the table: "geofence_variants" */
  geofence_variants_aggregate: Geofence_Variants_Aggregate;
  /** fetch data from the table: "geofence_variants" using primary key columns */
  geofence_variants_by_pk?: Maybe<Geofence_Variants>;
  /** fetch data from the table: "geofences" */
  geofences: Array<Geofences>;
  /** fetch aggregated fields from the table: "geofences" */
  geofences_aggregate: Geofences_Aggregate;
  /** fetch data from the table: "geofences" using primary key columns */
  geofences_by_pk?: Maybe<Geofences>;
  /** fetch data from the table: "likes" */
  likes: Array<Likes>;
  /** fetch aggregated fields from the table: "likes" */
  likes_aggregate: Likes_Aggregate;
  /** fetch data from the table: "likes" using primary key columns */
  likes_by_pk?: Maybe<Likes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};

/** subscription root */
export type Subscription_RootActivitiesArgs = {
  distinct_on?: Maybe<Array<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootActivities_AggregateArgs = {
  distinct_on?: Maybe<Array<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootActivities_By_PkArgs = {
  activity_id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCategories_By_PkArgs = {
  name: Scalars['String'];
};

/** subscription root */
export type Subscription_RootCommentsArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootComments_By_PkArgs = {
  comment_id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootFollowingsArgs = {
  distinct_on?: Maybe<Array<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFollowings_AggregateArgs = {
  distinct_on?: Maybe<Array<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFollowings_By_PkArgs = {
  following_id: Scalars['String'];
  user_id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootGeofence_VariantsArgs = {
  distinct_on?: Maybe<Array<Geofence_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofence_Variants_Order_By>>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGeofence_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Geofence_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofence_Variants_Order_By>>;
  where?: Maybe<Geofence_Variants_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGeofence_Variants_By_PkArgs = {
  name: Scalars['String'];
};

/** subscription root */
export type Subscription_RootGeofencesArgs = {
  distinct_on?: Maybe<Array<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGeofences_AggregateArgs = {
  distinct_on?: Maybe<Array<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGeofences_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootLikesArgs = {
  distinct_on?: Maybe<Array<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootLikes_AggregateArgs = {
  distinct_on?: Maybe<Array<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootLikes_By_PkArgs = {
  activity_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** expression to compare columns of type timestamp. All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamp']>;
  _gt?: Maybe<Scalars['timestamp']>;
  _gte?: Maybe<Scalars['timestamp']>;
  _in?: Maybe<Array<Scalars['timestamp']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamp']>;
  _lte?: Maybe<Scalars['timestamp']>;
  _neq?: Maybe<Scalars['timestamp']>;
  _nin?: Maybe<Array<Scalars['timestamp']>>;
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  activities: Array<Activities>;
  /** An aggregated array relationship */
  activities_aggregate: Activities_Aggregate;
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email: Scalars['String'];
  /** An array relationship */
  followers: Array<Followings>;
  /** An aggregated array relationship */
  followers_aggregate: Followings_Aggregate;
  /** An array relationship */
  following: Array<Followings>;
  /** An aggregated array relationship */
  following_aggregate: Followings_Aggregate;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** columns and relationships of "users" */
export type UsersActivitiesArgs = {
  distinct_on?: Maybe<Array<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersActivities_AggregateArgs = {
  distinct_on?: Maybe<Array<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersFollowersArgs = {
  distinct_on?: Maybe<Array<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersFollowers_AggregateArgs = {
  distinct_on?: Maybe<Array<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersFollowingArgs = {
  distinct_on?: Maybe<Array<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersFollowing_AggregateArgs = {
  distinct_on?: Maybe<Array<Followings_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Followings_Order_By>>;
  where?: Maybe<Followings_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  activities?: Maybe<Activities_Bool_Exp>;
  bio?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  followers?: Maybe<Followings_Bool_Exp>;
  following?: Maybe<Followings_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
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
  activities?: Maybe<Activities_Arr_Rel_Insert_Input>;
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  followers?: Maybe<Followings_Arr_Rel_Insert_Input>;
  following?: Maybe<Followings_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  activities_aggregate?: Maybe<Activities_Aggregate_Order_By>;
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  followers_aggregate?: Maybe<Followings_Aggregate_Order_By>;
  following_aggregate?: Maybe<Followings_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
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
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
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
