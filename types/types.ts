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
  bigint: any;
  date: any;
  float8: any;
  interval: any;
  json: any;
  timestamp: any;
  timestamptz: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
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

/** columns and relationships of "achievement" */
export type Achievement = {
  __typename?: 'achievement';
  /** An object relationship */
  achievementTypeByAchievementType: Achievement_Type;
  achievement_type: Achievement_Type_Enum;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  /** An object relationship */
  feed?: Maybe<Feed>;
  id: Scalars['Int'];
  level: Scalars['Int'];
  name: Scalars['String'];
  rule: Scalars['json'];
  /** An array relationship */
  user_achievements: Array<User_Achievement>;
  /** An aggregated array relationship */
  user_achievements_aggregate: User_Achievement_Aggregate;
};

/** columns and relationships of "achievement" */
export type AchievementRuleArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "achievement" */
export type AchievementUser_AchievementsArgs = {
  distinct_on?: Maybe<Array<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** columns and relationships of "achievement" */
export type AchievementUser_Achievements_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** aggregated selection of "achievement" */
export type Achievement_Aggregate = {
  __typename?: 'achievement_aggregate';
  aggregate?: Maybe<Achievement_Aggregate_Fields>;
  nodes: Array<Achievement>;
};

/** aggregate fields of "achievement" */
export type Achievement_Aggregate_Fields = {
  __typename?: 'achievement_aggregate_fields';
  avg?: Maybe<Achievement_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Achievement_Max_Fields>;
  min?: Maybe<Achievement_Min_Fields>;
  stddev?: Maybe<Achievement_Stddev_Fields>;
  stddev_pop?: Maybe<Achievement_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Achievement_Stddev_Samp_Fields>;
  sum?: Maybe<Achievement_Sum_Fields>;
  var_pop?: Maybe<Achievement_Var_Pop_Fields>;
  var_samp?: Maybe<Achievement_Var_Samp_Fields>;
  variance?: Maybe<Achievement_Variance_Fields>;
};

/** aggregate fields of "achievement" */
export type Achievement_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Achievement_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "achievement" */
export type Achievement_Aggregate_Order_By = {
  avg?: Maybe<Achievement_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Achievement_Max_Order_By>;
  min?: Maybe<Achievement_Min_Order_By>;
  stddev?: Maybe<Achievement_Stddev_Order_By>;
  stddev_pop?: Maybe<Achievement_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Achievement_Stddev_Samp_Order_By>;
  sum?: Maybe<Achievement_Sum_Order_By>;
  var_pop?: Maybe<Achievement_Var_Pop_Order_By>;
  var_samp?: Maybe<Achievement_Var_Samp_Order_By>;
  variance?: Maybe<Achievement_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "achievement" */
export type Achievement_Arr_Rel_Insert_Input = {
  data: Array<Achievement_Insert_Input>;
  on_conflict?: Maybe<Achievement_On_Conflict>;
};

/** aggregate avg on columns */
export type Achievement_Avg_Fields = {
  __typename?: 'achievement_avg_fields';
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "achievement" */
export type Achievement_Avg_Order_By = {
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "achievement". All fields are combined with a logical 'AND'. */
export type Achievement_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Achievement_Bool_Exp>>>;
  _not?: Maybe<Achievement_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Achievement_Bool_Exp>>>;
  achievementTypeByAchievementType?: Maybe<Achievement_Type_Bool_Exp>;
  achievement_type?: Maybe<Achievement_Type_Enum_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  feed?: Maybe<Feed_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  level?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  rule?: Maybe<Json_Comparison_Exp>;
  user_achievements?: Maybe<User_Achievement_Bool_Exp>;
};

/** unique or primary key constraints on table "achievement" */
export enum Achievement_Constraint {
  /** unique or primary key constraint */
  AcheivementPkey = 'Acheivement_pkey',
}

/** input type for incrementing integer column in table "achievement" */
export type Achievement_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "achievement" */
export type Achievement_Insert_Input = {
  achievementTypeByAchievementType?: Maybe<Achievement_Type_Obj_Rel_Insert_Input>;
  achievement_type?: Maybe<Achievement_Type_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  feed?: Maybe<Feed_Obj_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  rule?: Maybe<Scalars['json']>;
  user_achievements?: Maybe<User_Achievement_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Achievement_Max_Fields = {
  __typename?: 'achievement_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "achievement" */
export type Achievement_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Achievement_Min_Fields = {
  __typename?: 'achievement_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "achievement" */
export type Achievement_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "achievement" */
export type Achievement_Mutation_Response = {
  __typename?: 'achievement_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Achievement>;
};

/** input type for inserting object relation for remote table "achievement" */
export type Achievement_Obj_Rel_Insert_Input = {
  data: Achievement_Insert_Input;
  on_conflict?: Maybe<Achievement_On_Conflict>;
};

/** on conflict condition type for table "achievement" */
export type Achievement_On_Conflict = {
  constraint: Achievement_Constraint;
  update_columns: Array<Achievement_Update_Column>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** ordering options when selecting data from "achievement" */
export type Achievement_Order_By = {
  achievementTypeByAchievementType?: Maybe<Achievement_Type_Order_By>;
  achievement_type?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  feed?: Maybe<Feed_Order_By>;
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  rule?: Maybe<Order_By>;
  user_achievements_aggregate?: Maybe<User_Achievement_Aggregate_Order_By>;
};

/** primary key columns input for table: "achievement" */
export type Achievement_Pk_Columns_Input = {
  id: Scalars['Int'];
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
  achievement_type?: Maybe<Achievement_Type_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  rule?: Maybe<Scalars['json']>;
};

/** aggregate stddev on columns */
export type Achievement_Stddev_Fields = {
  __typename?: 'achievement_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "achievement" */
export type Achievement_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Achievement_Stddev_Pop_Fields = {
  __typename?: 'achievement_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "achievement" */
export type Achievement_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Achievement_Stddev_Samp_Fields = {
  __typename?: 'achievement_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "achievement" */
export type Achievement_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Achievement_Sum_Fields = {
  __typename?: 'achievement_sum_fields';
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "achievement" */
export type Achievement_Sum_Order_By = {
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
};

/** columns and relationships of "achievement_type" */
export type Achievement_Type = {
  __typename?: 'achievement_type';
  /** An array relationship */
  achievements: Array<Achievement>;
  /** An aggregated array relationship */
  achievements_aggregate: Achievement_Aggregate;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** columns and relationships of "achievement_type" */
export type Achievement_TypeAchievementsArgs = {
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** columns and relationships of "achievement_type" */
export type Achievement_TypeAchievements_AggregateArgs = {
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** aggregated selection of "achievement_type" */
export type Achievement_Type_Aggregate = {
  __typename?: 'achievement_type_aggregate';
  aggregate?: Maybe<Achievement_Type_Aggregate_Fields>;
  nodes: Array<Achievement_Type>;
};

/** aggregate fields of "achievement_type" */
export type Achievement_Type_Aggregate_Fields = {
  __typename?: 'achievement_type_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Achievement_Type_Max_Fields>;
  min?: Maybe<Achievement_Type_Min_Fields>;
};

/** aggregate fields of "achievement_type" */
export type Achievement_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Achievement_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "achievement_type" */
export type Achievement_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Achievement_Type_Max_Order_By>;
  min?: Maybe<Achievement_Type_Min_Order_By>;
};

/** input type for inserting array relation for remote table "achievement_type" */
export type Achievement_Type_Arr_Rel_Insert_Input = {
  data: Array<Achievement_Type_Insert_Input>;
  on_conflict?: Maybe<Achievement_Type_On_Conflict>;
};

/** Boolean expression to filter rows from the table "achievement_type". All fields are combined with a logical 'AND'. */
export type Achievement_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Achievement_Type_Bool_Exp>>>;
  _not?: Maybe<Achievement_Type_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Achievement_Type_Bool_Exp>>>;
  achievements?: Maybe<Achievement_Bool_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "achievement_type" */
export enum Achievement_Type_Constraint {
  /** unique or primary key constraint */
  AchievementTypePkey = 'achievement_type_pkey',
}

export enum Achievement_Type_Enum {
  /** First activity in the app */
  FirstActivity = 'FIRST_ACTIVITY',
  Score = 'SCORE',
  ScoreInCategory = 'SCORE_IN_CATEGORY',
}

/** expression to compare columns of type achievement_type_enum. All fields are combined with logical 'AND'. */
export type Achievement_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Achievement_Type_Enum>;
  _in?: Maybe<Array<Achievement_Type_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Achievement_Type_Enum>;
  _nin?: Maybe<Array<Achievement_Type_Enum>>;
};

/** input type for inserting data into table "achievement_type" */
export type Achievement_Type_Insert_Input = {
  achievements?: Maybe<Achievement_Arr_Rel_Insert_Input>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Achievement_Type_Max_Fields = {
  __typename?: 'achievement_type_max_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "achievement_type" */
export type Achievement_Type_Max_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Achievement_Type_Min_Fields = {
  __typename?: 'achievement_type_min_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "achievement_type" */
export type Achievement_Type_Min_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "achievement_type" */
export type Achievement_Type_Mutation_Response = {
  __typename?: 'achievement_type_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Achievement_Type>;
};

/** input type for inserting object relation for remote table "achievement_type" */
export type Achievement_Type_Obj_Rel_Insert_Input = {
  data: Achievement_Type_Insert_Input;
  on_conflict?: Maybe<Achievement_Type_On_Conflict>;
};

/** on conflict condition type for table "achievement_type" */
export type Achievement_Type_On_Conflict = {
  constraint: Achievement_Type_Constraint;
  update_columns: Array<Achievement_Type_Update_Column>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** ordering options when selecting data from "achievement_type" */
export type Achievement_Type_Order_By = {
  achievements_aggregate?: Maybe<Achievement_Aggregate_Order_By>;
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "achievement_type" */
export type Achievement_Type_Pk_Columns_Input = {
  name: Scalars['String'];
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
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  __typename?: 'achievement_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "achievement" */
export type Achievement_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Achievement_Var_Samp_Fields = {
  __typename?: 'achievement_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "achievement" */
export type Achievement_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Achievement_Variance_Fields = {
  __typename?: 'achievement_variance_fields';
  id?: Maybe<Scalars['Float']>;
  level?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "achievement" */
export type Achievement_Variance_Order_By = {
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
};

/** columns and relationships of "activities" */
export type Activities = {
  __typename?: 'activities';
  activity_id: Scalars['Int'];
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  duration: Scalars['interval'];
  /** An object relationship */
  feed?: Maybe<Feed>;
  /** An array relationship */
  feeds: Array<Feed>;
  /** An aggregated array relationship */
  feeds_aggregate: Feed_Aggregate;
  /** An object relationship */
  friend?: Maybe<Users>;
  friend_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  geofence: Geofences;
  geofence_id: Scalars['Int'];
  score?: Maybe<Scalars['Int']>;
  started_at?: Maybe<Scalars['timestamptz']>;
  /** A computed field, executes function "stopped_at" */
  stopped_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** columns and relationships of "activities" */
export type ActivitiesFeedsArgs = {
  distinct_on?: Maybe<Array<Feed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Order_By>>;
  where?: Maybe<Feed_Bool_Exp>;
};

/** columns and relationships of "activities" */
export type ActivitiesFeeds_AggregateArgs = {
  distinct_on?: Maybe<Array<Feed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Order_By>>;
  where?: Maybe<Feed_Bool_Exp>;
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
  score?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "activities" */
export type Activities_Avg_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "activities". All fields are combined with a logical 'AND'. */
export type Activities_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Activities_Bool_Exp>>>;
  _not?: Maybe<Activities_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Activities_Bool_Exp>>>;
  activity_id?: Maybe<Int_Comparison_Exp>;
  caption?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  duration?: Maybe<Interval_Comparison_Exp>;
  feed?: Maybe<Feed_Bool_Exp>;
  feeds?: Maybe<Feed_Bool_Exp>;
  friend?: Maybe<Users_Bool_Exp>;
  friend_id?: Maybe<String_Comparison_Exp>;
  geofence?: Maybe<Geofences_Bool_Exp>;
  geofence_id?: Maybe<Int_Comparison_Exp>;
  score?: Maybe<Int_Comparison_Exp>;
  started_at?: Maybe<Timestamptz_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "activities" */
export enum Activities_Constraint {
  /** unique or primary key constraint */
  ActivityPkey = 'Activity_pkey',
  /** unique or primary key constraint */
  ActivitiesActivityIdUserIdKey = 'activities_activity_id_user_id_key',
  /** unique or primary key constraint */
  ActivitiesStartedAtUserIdKey = 'activities_started_at_user_id_key',
}

/** input type for incrementing integer column in table "activities" */
export type Activities_Inc_Input = {
  activity_id?: Maybe<Scalars['Int']>;
  geofence_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "activities" */
export type Activities_Insert_Input = {
  activity_id?: Maybe<Scalars['Int']>;
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  duration?: Maybe<Scalars['interval']>;
  feed?: Maybe<Feed_Obj_Rel_Insert_Input>;
  feeds?: Maybe<Feed_Arr_Rel_Insert_Input>;
  friend?: Maybe<Users_Obj_Rel_Insert_Input>;
  friend_id?: Maybe<Scalars['String']>;
  geofence?: Maybe<Geofences_Obj_Rel_Insert_Input>;
  geofence_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
  started_at?: Maybe<Scalars['timestamptz']>;
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
  friend_id?: Maybe<Scalars['String']>;
  geofence_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
  started_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "activities" */
export type Activities_Max_Order_By = {
  activity_id?: Maybe<Order_By>;
  caption?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  friend_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  started_at?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Activities_Min_Fields = {
  __typename?: 'activities_min_fields';
  activity_id?: Maybe<Scalars['Int']>;
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  friend_id?: Maybe<Scalars['String']>;
  geofence_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
  started_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "activities" */
export type Activities_Min_Order_By = {
  activity_id?: Maybe<Order_By>;
  caption?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  friend_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  started_at?: Maybe<Order_By>;
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
  activity_id?: Maybe<Order_By>;
  caption?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  duration?: Maybe<Order_By>;
  feed?: Maybe<Feed_Order_By>;
  feeds_aggregate?: Maybe<Feed_Aggregate_Order_By>;
  friend?: Maybe<Users_Order_By>;
  friend_id?: Maybe<Order_By>;
  geofence?: Maybe<Geofences_Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  started_at?: Maybe<Order_By>;
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
  CreatedAt = 'created_at',
  /** column name */
  Duration = 'duration',
  /** column name */
  FriendId = 'friend_id',
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
  activity_id?: Maybe<Scalars['Int']>;
  caption?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  duration?: Maybe<Scalars['interval']>;
  friend_id?: Maybe<Scalars['String']>;
  geofence_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
  started_at?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Activities_Stddev_Fields = {
  __typename?: 'activities_stddev_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "activities" */
export type Activities_Stddev_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Activities_Stddev_Pop_Fields = {
  __typename?: 'activities_stddev_pop_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "activities" */
export type Activities_Stddev_Pop_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Activities_Stddev_Samp_Fields = {
  __typename?: 'activities_stddev_samp_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "activities" */
export type Activities_Stddev_Samp_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Activities_Sum_Fields = {
  __typename?: 'activities_sum_fields';
  activity_id?: Maybe<Scalars['Int']>;
  geofence_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "activities" */
export type Activities_Sum_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
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
  FriendId = 'friend_id',
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
  __typename?: 'activities_var_pop_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "activities" */
export type Activities_Var_Pop_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Activities_Var_Samp_Fields = {
  __typename?: 'activities_var_samp_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "activities" */
export type Activities_Var_Samp_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Activities_Variance_Fields = {
  __typename?: 'activities_variance_fields';
  activity_id?: Maybe<Scalars['Float']>;
  geofence_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "activities" */
export type Activities_Variance_Order_By = {
  activity_id?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories';
  description: Scalars['String'];
  name: Scalars['String'];
  points_per_minute: Scalars['Int'];
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
  avg?: Maybe<Categories_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Categories_Max_Fields>;
  min?: Maybe<Categories_Min_Fields>;
  stddev?: Maybe<Categories_Stddev_Fields>;
  stddev_pop?: Maybe<Categories_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Categories_Stddev_Samp_Fields>;
  sum?: Maybe<Categories_Sum_Fields>;
  var_pop?: Maybe<Categories_Var_Pop_Fields>;
  var_samp?: Maybe<Categories_Var_Samp_Fields>;
  variance?: Maybe<Categories_Variance_Fields>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Categories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "categories" */
export type Categories_Aggregate_Order_By = {
  avg?: Maybe<Categories_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Categories_Max_Order_By>;
  min?: Maybe<Categories_Min_Order_By>;
  stddev?: Maybe<Categories_Stddev_Order_By>;
  stddev_pop?: Maybe<Categories_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Categories_Stddev_Samp_Order_By>;
  sum?: Maybe<Categories_Sum_Order_By>;
  var_pop?: Maybe<Categories_Var_Pop_Order_By>;
  var_samp?: Maybe<Categories_Var_Samp_Order_By>;
  variance?: Maybe<Categories_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "categories" */
export type Categories_Arr_Rel_Insert_Input = {
  data: Array<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** aggregate avg on columns */
export type Categories_Avg_Fields = {
  __typename?: 'categories_avg_fields';
  points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "categories" */
export type Categories_Avg_Order_By = {
  points_per_minute?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Categories_Bool_Exp>>>;
  _not?: Maybe<Categories_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Categories_Bool_Exp>>>;
  description?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  points_per_minute?: Maybe<Int_Comparison_Exp>;
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
  points_per_minute?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  points_per_minute?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  __typename?: 'categories_max_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  points_per_minute?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "categories" */
export type Categories_Max_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  points_per_minute?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  __typename?: 'categories_min_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  points_per_minute?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "categories" */
export type Categories_Min_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  points_per_minute?: Maybe<Order_By>;
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
  points_per_minute?: Maybe<Order_By>;
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
  /** column name */
  PointsPerMinute = 'points_per_minute',
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  points_per_minute?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Categories_Stddev_Fields = {
  __typename?: 'categories_stddev_fields';
  points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "categories" */
export type Categories_Stddev_Order_By = {
  points_per_minute?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Categories_Stddev_Pop_Fields = {
  __typename?: 'categories_stddev_pop_fields';
  points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "categories" */
export type Categories_Stddev_Pop_Order_By = {
  points_per_minute?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Categories_Stddev_Samp_Fields = {
  __typename?: 'categories_stddev_samp_fields';
  points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "categories" */
export type Categories_Stddev_Samp_Order_By = {
  points_per_minute?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Categories_Sum_Fields = {
  __typename?: 'categories_sum_fields';
  points_per_minute?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "categories" */
export type Categories_Sum_Order_By = {
  points_per_minute?: Maybe<Order_By>;
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
  __typename?: 'categories_var_pop_fields';
  points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "categories" */
export type Categories_Var_Pop_Order_By = {
  points_per_minute?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Categories_Var_Samp_Fields = {
  __typename?: 'categories_var_samp_fields';
  points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "categories" */
export type Categories_Var_Samp_Order_By = {
  points_per_minute?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Categories_Variance_Fields = {
  __typename?: 'categories_variance_fields';
  points_per_minute?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "categories" */
export type Categories_Variance_Order_By = {
  points_per_minute?: Maybe<Order_By>;
};

/** columns and relationships of "challenge" */
export type Challenge = {
  __typename?: 'challenge';
  /** An object relationship */
  challengeTypeByChallengeType: Challenge_Type;
  /** An array relationship */
  challenge_participants: Array<Challenge_Participant>;
  /** An aggregated array relationship */
  challenge_participants_aggregate: Challenge_Participant_Aggregate;
  /** An object relationship */
  challenge_state: Challenge_State;
  challenge_type: Challenge_Type_Enum;
  created_at: Scalars['timestamptz'];
  created_by: Scalars['String'];
  /** An object relationship */
  created_by_user: Users;
  end_date: Scalars['date'];
  /** An object relationship */
  feed?: Maybe<Feed>;
  id: Scalars['Int'];
  rules: Scalars['json'];
  start_date: Scalars['date'];
  state: Challenge_State_Enum;
  /** An object relationship */
  winner?: Maybe<Users>;
  winner_id?: Maybe<Scalars['String']>;
};

/** columns and relationships of "challenge" */
export type ChallengeChallenge_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** columns and relationships of "challenge" */
export type ChallengeChallenge_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** columns and relationships of "challenge" */
export type ChallengeRulesArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "challenge" */
export type Challenge_Aggregate = {
  __typename?: 'challenge_aggregate';
  aggregate?: Maybe<Challenge_Aggregate_Fields>;
  nodes: Array<Challenge>;
};

/** aggregate fields of "challenge" */
export type Challenge_Aggregate_Fields = {
  __typename?: 'challenge_aggregate_fields';
  avg?: Maybe<Challenge_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Challenge_Max_Fields>;
  min?: Maybe<Challenge_Min_Fields>;
  stddev?: Maybe<Challenge_Stddev_Fields>;
  stddev_pop?: Maybe<Challenge_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Challenge_Stddev_Samp_Fields>;
  sum?: Maybe<Challenge_Sum_Fields>;
  var_pop?: Maybe<Challenge_Var_Pop_Fields>;
  var_samp?: Maybe<Challenge_Var_Samp_Fields>;
  variance?: Maybe<Challenge_Variance_Fields>;
};

/** aggregate fields of "challenge" */
export type Challenge_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Challenge_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "challenge" */
export type Challenge_Aggregate_Order_By = {
  avg?: Maybe<Challenge_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Challenge_Max_Order_By>;
  min?: Maybe<Challenge_Min_Order_By>;
  stddev?: Maybe<Challenge_Stddev_Order_By>;
  stddev_pop?: Maybe<Challenge_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Challenge_Stddev_Samp_Order_By>;
  sum?: Maybe<Challenge_Sum_Order_By>;
  var_pop?: Maybe<Challenge_Var_Pop_Order_By>;
  var_samp?: Maybe<Challenge_Var_Samp_Order_By>;
  variance?: Maybe<Challenge_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "challenge" */
export type Challenge_Arr_Rel_Insert_Input = {
  data: Array<Challenge_Insert_Input>;
  on_conflict?: Maybe<Challenge_On_Conflict>;
};

/** aggregate avg on columns */
export type Challenge_Avg_Fields = {
  __typename?: 'challenge_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "challenge" */
export type Challenge_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "challenge". All fields are combined with a logical 'AND'. */
export type Challenge_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Challenge_Bool_Exp>>>;
  _not?: Maybe<Challenge_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Challenge_Bool_Exp>>>;
  challengeTypeByChallengeType?: Maybe<Challenge_Type_Bool_Exp>;
  challenge_participants?: Maybe<Challenge_Participant_Bool_Exp>;
  challenge_state?: Maybe<Challenge_State_Bool_Exp>;
  challenge_type?: Maybe<Challenge_Type_Enum_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  created_by?: Maybe<String_Comparison_Exp>;
  created_by_user?: Maybe<Users_Bool_Exp>;
  end_date?: Maybe<Date_Comparison_Exp>;
  feed?: Maybe<Feed_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  rules?: Maybe<Json_Comparison_Exp>;
  start_date?: Maybe<Date_Comparison_Exp>;
  state?: Maybe<Challenge_State_Enum_Comparison_Exp>;
  winner?: Maybe<Users_Bool_Exp>;
  winner_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "challenge" */
export enum Challenge_Constraint {
  /** unique or primary key constraint */
  ChallengeIdWinnerIdKey = 'challenge_id_winner_id_key',
  /** unique or primary key constraint */
  UserChallengePkey = 'user_challenge_pkey',
}

/** input type for incrementing integer column in table "challenge" */
export type Challenge_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "challenge" */
export type Challenge_Insert_Input = {
  challengeTypeByChallengeType?: Maybe<Challenge_Type_Obj_Rel_Insert_Input>;
  challenge_participants?: Maybe<Challenge_Participant_Arr_Rel_Insert_Input>;
  challenge_state?: Maybe<Challenge_State_Obj_Rel_Insert_Input>;
  challenge_type?: Maybe<Challenge_Type_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  created_by_user?: Maybe<Users_Obj_Rel_Insert_Input>;
  end_date?: Maybe<Scalars['date']>;
  feed?: Maybe<Feed_Obj_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  rules?: Maybe<Scalars['json']>;
  start_date?: Maybe<Scalars['date']>;
  state?: Maybe<Challenge_State_Enum>;
  winner?: Maybe<Users_Obj_Rel_Insert_Input>;
  winner_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Challenge_Max_Fields = {
  __typename?: 'challenge_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  winner_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "challenge" */
export type Challenge_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  end_date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  start_date?: Maybe<Order_By>;
  winner_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Challenge_Min_Fields = {
  __typename?: 'challenge_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  winner_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "challenge" */
export type Challenge_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  end_date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  start_date?: Maybe<Order_By>;
  winner_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "challenge" */
export type Challenge_Mutation_Response = {
  __typename?: 'challenge_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Challenge>;
};

/** input type for inserting object relation for remote table "challenge" */
export type Challenge_Obj_Rel_Insert_Input = {
  data: Challenge_Insert_Input;
  on_conflict?: Maybe<Challenge_On_Conflict>;
};

/** on conflict condition type for table "challenge" */
export type Challenge_On_Conflict = {
  constraint: Challenge_Constraint;
  update_columns: Array<Challenge_Update_Column>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** ordering options when selecting data from "challenge" */
export type Challenge_Order_By = {
  challengeTypeByChallengeType?: Maybe<Challenge_Type_Order_By>;
  challenge_participants_aggregate?: Maybe<Challenge_Participant_Aggregate_Order_By>;
  challenge_state?: Maybe<Challenge_State_Order_By>;
  challenge_type?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  created_by_user?: Maybe<Users_Order_By>;
  end_date?: Maybe<Order_By>;
  feed?: Maybe<Feed_Order_By>;
  id?: Maybe<Order_By>;
  rules?: Maybe<Order_By>;
  start_date?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  winner?: Maybe<Users_Order_By>;
  winner_id?: Maybe<Order_By>;
};

/** columns and relationships of "challenge_participant" */
export type Challenge_Participant = {
  __typename?: 'challenge_participant';
  /** An object relationship */
  challenge: Challenge;
  challenge_id: Scalars['Int'];
  /** An object relationship */
  challenge_participant_state: Challenge_Participant_State;
  progress?: Maybe<Scalars['float8']>;
  state: Challenge_Participant_State_Enum;
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "challenge_participant" */
export type Challenge_Participant_Aggregate = {
  __typename?: 'challenge_participant_aggregate';
  aggregate?: Maybe<Challenge_Participant_Aggregate_Fields>;
  nodes: Array<Challenge_Participant>;
};

/** aggregate fields of "challenge_participant" */
export type Challenge_Participant_Aggregate_Fields = {
  __typename?: 'challenge_participant_aggregate_fields';
  avg?: Maybe<Challenge_Participant_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Challenge_Participant_Max_Fields>;
  min?: Maybe<Challenge_Participant_Min_Fields>;
  stddev?: Maybe<Challenge_Participant_Stddev_Fields>;
  stddev_pop?: Maybe<Challenge_Participant_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Challenge_Participant_Stddev_Samp_Fields>;
  sum?: Maybe<Challenge_Participant_Sum_Fields>;
  var_pop?: Maybe<Challenge_Participant_Var_Pop_Fields>;
  var_samp?: Maybe<Challenge_Participant_Var_Samp_Fields>;
  variance?: Maybe<Challenge_Participant_Variance_Fields>;
};

/** aggregate fields of "challenge_participant" */
export type Challenge_Participant_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Challenge_Participant_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "challenge_participant" */
export type Challenge_Participant_Aggregate_Order_By = {
  avg?: Maybe<Challenge_Participant_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Challenge_Participant_Max_Order_By>;
  min?: Maybe<Challenge_Participant_Min_Order_By>;
  stddev?: Maybe<Challenge_Participant_Stddev_Order_By>;
  stddev_pop?: Maybe<Challenge_Participant_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Challenge_Participant_Stddev_Samp_Order_By>;
  sum?: Maybe<Challenge_Participant_Sum_Order_By>;
  var_pop?: Maybe<Challenge_Participant_Var_Pop_Order_By>;
  var_samp?: Maybe<Challenge_Participant_Var_Samp_Order_By>;
  variance?: Maybe<Challenge_Participant_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "challenge_participant" */
export type Challenge_Participant_Arr_Rel_Insert_Input = {
  data: Array<Challenge_Participant_Insert_Input>;
  on_conflict?: Maybe<Challenge_Participant_On_Conflict>;
};

/** aggregate avg on columns */
export type Challenge_Participant_Avg_Fields = {
  __typename?: 'challenge_participant_avg_fields';
  challenge_id?: Maybe<Scalars['Float']>;
  progress?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "challenge_participant" */
export type Challenge_Participant_Avg_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "challenge_participant". All fields are combined with a logical 'AND'. */
export type Challenge_Participant_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Challenge_Participant_Bool_Exp>>>;
  _not?: Maybe<Challenge_Participant_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Challenge_Participant_Bool_Exp>>>;
  challenge?: Maybe<Challenge_Bool_Exp>;
  challenge_id?: Maybe<Int_Comparison_Exp>;
  challenge_participant_state?: Maybe<Challenge_Participant_State_Bool_Exp>;
  progress?: Maybe<Float8_Comparison_Exp>;
  state?: Maybe<Challenge_Participant_State_Enum_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "challenge_participant" */
export enum Challenge_Participant_Constraint {
  /** unique or primary key constraint */
  ChallengeParticipantsPkey = 'challenge_participants_pkey',
}

/** input type for incrementing integer column in table "challenge_participant" */
export type Challenge_Participant_Inc_Input = {
  challenge_id?: Maybe<Scalars['Int']>;
  progress?: Maybe<Scalars['float8']>;
};

/** input type for inserting data into table "challenge_participant" */
export type Challenge_Participant_Insert_Input = {
  challenge?: Maybe<Challenge_Obj_Rel_Insert_Input>;
  challenge_id?: Maybe<Scalars['Int']>;
  challenge_participant_state?: Maybe<Challenge_Participant_State_Obj_Rel_Insert_Input>;
  progress?: Maybe<Scalars['float8']>;
  state?: Maybe<Challenge_Participant_State_Enum>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Challenge_Participant_Max_Fields = {
  __typename?: 'challenge_participant_max_fields';
  challenge_id?: Maybe<Scalars['Int']>;
  progress?: Maybe<Scalars['float8']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "challenge_participant" */
export type Challenge_Participant_Max_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Challenge_Participant_Min_Fields = {
  __typename?: 'challenge_participant_min_fields';
  challenge_id?: Maybe<Scalars['Int']>;
  progress?: Maybe<Scalars['float8']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "challenge_participant" */
export type Challenge_Participant_Min_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "challenge_participant" */
export type Challenge_Participant_Mutation_Response = {
  __typename?: 'challenge_participant_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Challenge_Participant>;
};

/** input type for inserting object relation for remote table "challenge_participant" */
export type Challenge_Participant_Obj_Rel_Insert_Input = {
  data: Challenge_Participant_Insert_Input;
  on_conflict?: Maybe<Challenge_Participant_On_Conflict>;
};

/** on conflict condition type for table "challenge_participant" */
export type Challenge_Participant_On_Conflict = {
  constraint: Challenge_Participant_Constraint;
  update_columns: Array<Challenge_Participant_Update_Column>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** ordering options when selecting data from "challenge_participant" */
export type Challenge_Participant_Order_By = {
  challenge?: Maybe<Challenge_Order_By>;
  challenge_id?: Maybe<Order_By>;
  challenge_participant_state?: Maybe<Challenge_Participant_State_Order_By>;
  progress?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "challenge_participant" */
export type Challenge_Participant_Pk_Columns_Input = {
  challenge_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** select columns of table "challenge_participant" */
export enum Challenge_Participant_Select_Column {
  /** column name */
  ChallengeId = 'challenge_id',
  /** column name */
  Progress = 'progress',
  /** column name */
  State = 'state',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "challenge_participant" */
export type Challenge_Participant_Set_Input = {
  challenge_id?: Maybe<Scalars['Int']>;
  progress?: Maybe<Scalars['float8']>;
  state?: Maybe<Challenge_Participant_State_Enum>;
  user_id?: Maybe<Scalars['String']>;
};

/** columns and relationships of "challenge_participant_state" */
export type Challenge_Participant_State = {
  __typename?: 'challenge_participant_state';
  /** An array relationship */
  challenge_participants: Array<Challenge_Participant>;
  /** An aggregated array relationship */
  challenge_participants_aggregate: Challenge_Participant_Aggregate;
  state: Scalars['String'];
};

/** columns and relationships of "challenge_participant_state" */
export type Challenge_Participant_StateChallenge_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** columns and relationships of "challenge_participant_state" */
export type Challenge_Participant_StateChallenge_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** aggregated selection of "challenge_participant_state" */
export type Challenge_Participant_State_Aggregate = {
  __typename?: 'challenge_participant_state_aggregate';
  aggregate?: Maybe<Challenge_Participant_State_Aggregate_Fields>;
  nodes: Array<Challenge_Participant_State>;
};

/** aggregate fields of "challenge_participant_state" */
export type Challenge_Participant_State_Aggregate_Fields = {
  __typename?: 'challenge_participant_state_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Challenge_Participant_State_Max_Fields>;
  min?: Maybe<Challenge_Participant_State_Min_Fields>;
};

/** aggregate fields of "challenge_participant_state" */
export type Challenge_Participant_State_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Challenge_Participant_State_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "challenge_participant_state" */
export type Challenge_Participant_State_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Challenge_Participant_State_Max_Order_By>;
  min?: Maybe<Challenge_Participant_State_Min_Order_By>;
};

/** input type for inserting array relation for remote table "challenge_participant_state" */
export type Challenge_Participant_State_Arr_Rel_Insert_Input = {
  data: Array<Challenge_Participant_State_Insert_Input>;
  on_conflict?: Maybe<Challenge_Participant_State_On_Conflict>;
};

/** Boolean expression to filter rows from the table "challenge_participant_state". All fields are combined with a logical 'AND'. */
export type Challenge_Participant_State_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Challenge_Participant_State_Bool_Exp>>>;
  _not?: Maybe<Challenge_Participant_State_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Challenge_Participant_State_Bool_Exp>>>;
  challenge_participants?: Maybe<Challenge_Participant_Bool_Exp>;
  state?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "challenge_participant_state" */
export enum Challenge_Participant_State_Constraint {
  /** unique or primary key constraint */
  ChallengeParticipantStatePkey = 'challenge_participant_state_pkey',
}

export enum Challenge_Participant_State_Enum {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Pending = 'PENDING',
}

/** expression to compare columns of type challenge_participant_state_enum. All fields are combined with logical 'AND'. */
export type Challenge_Participant_State_Enum_Comparison_Exp = {
  _eq?: Maybe<Challenge_Participant_State_Enum>;
  _in?: Maybe<Array<Challenge_Participant_State_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Challenge_Participant_State_Enum>;
  _nin?: Maybe<Array<Challenge_Participant_State_Enum>>;
};

/** input type for inserting data into table "challenge_participant_state" */
export type Challenge_Participant_State_Insert_Input = {
  challenge_participants?: Maybe<Challenge_Participant_Arr_Rel_Insert_Input>;
  state?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Challenge_Participant_State_Max_Fields = {
  __typename?: 'challenge_participant_state_max_fields';
  state?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "challenge_participant_state" */
export type Challenge_Participant_State_Max_Order_By = {
  state?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Challenge_Participant_State_Min_Fields = {
  __typename?: 'challenge_participant_state_min_fields';
  state?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "challenge_participant_state" */
export type Challenge_Participant_State_Min_Order_By = {
  state?: Maybe<Order_By>;
};

/** response of any mutation on the table "challenge_participant_state" */
export type Challenge_Participant_State_Mutation_Response = {
  __typename?: 'challenge_participant_state_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Challenge_Participant_State>;
};

/** input type for inserting object relation for remote table "challenge_participant_state" */
export type Challenge_Participant_State_Obj_Rel_Insert_Input = {
  data: Challenge_Participant_State_Insert_Input;
  on_conflict?: Maybe<Challenge_Participant_State_On_Conflict>;
};

/** on conflict condition type for table "challenge_participant_state" */
export type Challenge_Participant_State_On_Conflict = {
  constraint: Challenge_Participant_State_Constraint;
  update_columns: Array<Challenge_Participant_State_Update_Column>;
  where?: Maybe<Challenge_Participant_State_Bool_Exp>;
};

/** ordering options when selecting data from "challenge_participant_state" */
export type Challenge_Participant_State_Order_By = {
  challenge_participants_aggregate?: Maybe<Challenge_Participant_Aggregate_Order_By>;
  state?: Maybe<Order_By>;
};

/** primary key columns input for table: "challenge_participant_state" */
export type Challenge_Participant_State_Pk_Columns_Input = {
  state: Scalars['String'];
};

/** select columns of table "challenge_participant_state" */
export enum Challenge_Participant_State_Select_Column {
  /** column name */
  State = 'state',
}

/** input type for updating data in table "challenge_participant_state" */
export type Challenge_Participant_State_Set_Input = {
  state?: Maybe<Scalars['String']>;
};

/** update columns of table "challenge_participant_state" */
export enum Challenge_Participant_State_Update_Column {
  /** column name */
  State = 'state',
}

/** aggregate stddev on columns */
export type Challenge_Participant_Stddev_Fields = {
  __typename?: 'challenge_participant_stddev_fields';
  challenge_id?: Maybe<Scalars['Float']>;
  progress?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "challenge_participant" */
export type Challenge_Participant_Stddev_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Challenge_Participant_Stddev_Pop_Fields = {
  __typename?: 'challenge_participant_stddev_pop_fields';
  challenge_id?: Maybe<Scalars['Float']>;
  progress?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "challenge_participant" */
export type Challenge_Participant_Stddev_Pop_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Challenge_Participant_Stddev_Samp_Fields = {
  __typename?: 'challenge_participant_stddev_samp_fields';
  challenge_id?: Maybe<Scalars['Float']>;
  progress?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "challenge_participant" */
export type Challenge_Participant_Stddev_Samp_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Challenge_Participant_Sum_Fields = {
  __typename?: 'challenge_participant_sum_fields';
  challenge_id?: Maybe<Scalars['Int']>;
  progress?: Maybe<Scalars['float8']>;
};

/** order by sum() on columns of table "challenge_participant" */
export type Challenge_Participant_Sum_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
};

/** update columns of table "challenge_participant" */
export enum Challenge_Participant_Update_Column {
  /** column name */
  ChallengeId = 'challenge_id',
  /** column name */
  Progress = 'progress',
  /** column name */
  State = 'state',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Challenge_Participant_Var_Pop_Fields = {
  __typename?: 'challenge_participant_var_pop_fields';
  challenge_id?: Maybe<Scalars['Float']>;
  progress?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "challenge_participant" */
export type Challenge_Participant_Var_Pop_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Challenge_Participant_Var_Samp_Fields = {
  __typename?: 'challenge_participant_var_samp_fields';
  challenge_id?: Maybe<Scalars['Float']>;
  progress?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "challenge_participant" */
export type Challenge_Participant_Var_Samp_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Challenge_Participant_Variance_Fields = {
  __typename?: 'challenge_participant_variance_fields';
  challenge_id?: Maybe<Scalars['Float']>;
  progress?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "challenge_participant" */
export type Challenge_Participant_Variance_Order_By = {
  challenge_id?: Maybe<Order_By>;
  progress?: Maybe<Order_By>;
};

/** primary key columns input for table: "challenge" */
export type Challenge_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "challenge" */
export enum Challenge_Select_Column {
  /** column name */
  ChallengeType = 'challenge_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  Rules = 'rules',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  State = 'state',
  /** column name */
  WinnerId = 'winner_id',
}

/** input type for updating data in table "challenge" */
export type Challenge_Set_Input = {
  challenge_type?: Maybe<Challenge_Type_Enum>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['date']>;
  id?: Maybe<Scalars['Int']>;
  rules?: Maybe<Scalars['json']>;
  start_date?: Maybe<Scalars['date']>;
  state?: Maybe<Challenge_State_Enum>;
  winner_id?: Maybe<Scalars['String']>;
};

/** columns and relationships of "challenge_state" */
export type Challenge_State = {
  __typename?: 'challenge_state';
  /** An array relationship */
  challenges: Array<Challenge>;
  /** An aggregated array relationship */
  challenges_aggregate: Challenge_Aggregate;
  state: Scalars['String'];
};

/** columns and relationships of "challenge_state" */
export type Challenge_StateChallengesArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** columns and relationships of "challenge_state" */
export type Challenge_StateChallenges_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** aggregated selection of "challenge_state" */
export type Challenge_State_Aggregate = {
  __typename?: 'challenge_state_aggregate';
  aggregate?: Maybe<Challenge_State_Aggregate_Fields>;
  nodes: Array<Challenge_State>;
};

/** aggregate fields of "challenge_state" */
export type Challenge_State_Aggregate_Fields = {
  __typename?: 'challenge_state_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Challenge_State_Max_Fields>;
  min?: Maybe<Challenge_State_Min_Fields>;
};

/** aggregate fields of "challenge_state" */
export type Challenge_State_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Challenge_State_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "challenge_state" */
export type Challenge_State_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Challenge_State_Max_Order_By>;
  min?: Maybe<Challenge_State_Min_Order_By>;
};

/** input type for inserting array relation for remote table "challenge_state" */
export type Challenge_State_Arr_Rel_Insert_Input = {
  data: Array<Challenge_State_Insert_Input>;
  on_conflict?: Maybe<Challenge_State_On_Conflict>;
};

/** Boolean expression to filter rows from the table "challenge_state". All fields are combined with a logical 'AND'. */
export type Challenge_State_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Challenge_State_Bool_Exp>>>;
  _not?: Maybe<Challenge_State_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Challenge_State_Bool_Exp>>>;
  challenges?: Maybe<Challenge_Bool_Exp>;
  state?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "challenge_state" */
export enum Challenge_State_Constraint {
  /** unique or primary key constraint */
  ChallengeStatePkey = 'challenge_state_pkey',
}

export enum Challenge_State_Enum {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Finished = 'FINISHED',
}

/** expression to compare columns of type challenge_state_enum. All fields are combined with logical 'AND'. */
export type Challenge_State_Enum_Comparison_Exp = {
  _eq?: Maybe<Challenge_State_Enum>;
  _in?: Maybe<Array<Challenge_State_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Challenge_State_Enum>;
  _nin?: Maybe<Array<Challenge_State_Enum>>;
};

/** input type for inserting data into table "challenge_state" */
export type Challenge_State_Insert_Input = {
  challenges?: Maybe<Challenge_Arr_Rel_Insert_Input>;
  state?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Challenge_State_Max_Fields = {
  __typename?: 'challenge_state_max_fields';
  state?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "challenge_state" */
export type Challenge_State_Max_Order_By = {
  state?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Challenge_State_Min_Fields = {
  __typename?: 'challenge_state_min_fields';
  state?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "challenge_state" */
export type Challenge_State_Min_Order_By = {
  state?: Maybe<Order_By>;
};

/** response of any mutation on the table "challenge_state" */
export type Challenge_State_Mutation_Response = {
  __typename?: 'challenge_state_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Challenge_State>;
};

/** input type for inserting object relation for remote table "challenge_state" */
export type Challenge_State_Obj_Rel_Insert_Input = {
  data: Challenge_State_Insert_Input;
  on_conflict?: Maybe<Challenge_State_On_Conflict>;
};

/** on conflict condition type for table "challenge_state" */
export type Challenge_State_On_Conflict = {
  constraint: Challenge_State_Constraint;
  update_columns: Array<Challenge_State_Update_Column>;
  where?: Maybe<Challenge_State_Bool_Exp>;
};

/** ordering options when selecting data from "challenge_state" */
export type Challenge_State_Order_By = {
  challenges_aggregate?: Maybe<Challenge_Aggregate_Order_By>;
  state?: Maybe<Order_By>;
};

/** primary key columns input for table: "challenge_state" */
export type Challenge_State_Pk_Columns_Input = {
  state: Scalars['String'];
};

/** select columns of table "challenge_state" */
export enum Challenge_State_Select_Column {
  /** column name */
  State = 'state',
}

/** input type for updating data in table "challenge_state" */
export type Challenge_State_Set_Input = {
  state?: Maybe<Scalars['String']>;
};

/** update columns of table "challenge_state" */
export enum Challenge_State_Update_Column {
  /** column name */
  State = 'state',
}

/** aggregate stddev on columns */
export type Challenge_Stddev_Fields = {
  __typename?: 'challenge_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "challenge" */
export type Challenge_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Challenge_Stddev_Pop_Fields = {
  __typename?: 'challenge_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "challenge" */
export type Challenge_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Challenge_Stddev_Samp_Fields = {
  __typename?: 'challenge_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "challenge" */
export type Challenge_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Challenge_Sum_Fields = {
  __typename?: 'challenge_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "challenge" */
export type Challenge_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "challenge_type" */
export type Challenge_Type = {
  __typename?: 'challenge_type';
  /** An array relationship */
  challenges: Array<Challenge>;
  /** An aggregated array relationship */
  challenges_aggregate: Challenge_Aggregate;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** columns and relationships of "challenge_type" */
export type Challenge_TypeChallengesArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** columns and relationships of "challenge_type" */
export type Challenge_TypeChallenges_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** aggregated selection of "challenge_type" */
export type Challenge_Type_Aggregate = {
  __typename?: 'challenge_type_aggregate';
  aggregate?: Maybe<Challenge_Type_Aggregate_Fields>;
  nodes: Array<Challenge_Type>;
};

/** aggregate fields of "challenge_type" */
export type Challenge_Type_Aggregate_Fields = {
  __typename?: 'challenge_type_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Challenge_Type_Max_Fields>;
  min?: Maybe<Challenge_Type_Min_Fields>;
};

/** aggregate fields of "challenge_type" */
export type Challenge_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Challenge_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "challenge_type" */
export type Challenge_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Challenge_Type_Max_Order_By>;
  min?: Maybe<Challenge_Type_Min_Order_By>;
};

/** input type for inserting array relation for remote table "challenge_type" */
export type Challenge_Type_Arr_Rel_Insert_Input = {
  data: Array<Challenge_Type_Insert_Input>;
  on_conflict?: Maybe<Challenge_Type_On_Conflict>;
};

/** Boolean expression to filter rows from the table "challenge_type". All fields are combined with a logical 'AND'. */
export type Challenge_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Challenge_Type_Bool_Exp>>>;
  _not?: Maybe<Challenge_Type_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Challenge_Type_Bool_Exp>>>;
  challenges?: Maybe<Challenge_Bool_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "challenge_type" */
export enum Challenge_Type_Constraint {
  /** unique or primary key constraint */
  ChallengeTypeDescriptionKey = 'challenge_type_description_key',
  /** unique or primary key constraint */
  ChallengeTypePkey = 'challenge_type_pkey',
}

export enum Challenge_Type_Enum {
  /** Total score */
  Score = 'SCORE',
  /** Total score in category */
  ScoreCategory = 'SCORE_CATEGORY',
  /** Total time */
  Time = 'TIME',
  /** Total time in category */
  TimeCategory = 'TIME_CATEGORY',
}

/** expression to compare columns of type challenge_type_enum. All fields are combined with logical 'AND'. */
export type Challenge_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Challenge_Type_Enum>;
  _in?: Maybe<Array<Challenge_Type_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Challenge_Type_Enum>;
  _nin?: Maybe<Array<Challenge_Type_Enum>>;
};

/** input type for inserting data into table "challenge_type" */
export type Challenge_Type_Insert_Input = {
  challenges?: Maybe<Challenge_Arr_Rel_Insert_Input>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Challenge_Type_Max_Fields = {
  __typename?: 'challenge_type_max_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "challenge_type" */
export type Challenge_Type_Max_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Challenge_Type_Min_Fields = {
  __typename?: 'challenge_type_min_fields';
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "challenge_type" */
export type Challenge_Type_Min_Order_By = {
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "challenge_type" */
export type Challenge_Type_Mutation_Response = {
  __typename?: 'challenge_type_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Challenge_Type>;
};

/** input type for inserting object relation for remote table "challenge_type" */
export type Challenge_Type_Obj_Rel_Insert_Input = {
  data: Challenge_Type_Insert_Input;
  on_conflict?: Maybe<Challenge_Type_On_Conflict>;
};

/** on conflict condition type for table "challenge_type" */
export type Challenge_Type_On_Conflict = {
  constraint: Challenge_Type_Constraint;
  update_columns: Array<Challenge_Type_Update_Column>;
  where?: Maybe<Challenge_Type_Bool_Exp>;
};

/** ordering options when selecting data from "challenge_type" */
export type Challenge_Type_Order_By = {
  challenges_aggregate?: Maybe<Challenge_Aggregate_Order_By>;
  description?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "challenge_type" */
export type Challenge_Type_Pk_Columns_Input = {
  name: Scalars['String'];
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
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  CreatedBy = 'created_by',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  Rules = 'rules',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  State = 'state',
  /** column name */
  WinnerId = 'winner_id',
}

/** aggregate var_pop on columns */
export type Challenge_Var_Pop_Fields = {
  __typename?: 'challenge_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "challenge" */
export type Challenge_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Challenge_Var_Samp_Fields = {
  __typename?: 'challenge_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "challenge" */
export type Challenge_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Challenge_Variance_Fields = {
  __typename?: 'challenge_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "challenge" */
export type Challenge_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

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

/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: Maybe<Scalars['date']>;
  _gt?: Maybe<Scalars['date']>;
  _gte?: Maybe<Scalars['date']>;
  _in?: Maybe<Array<Scalars['date']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['date']>;
  _lte?: Maybe<Scalars['date']>;
  _neq?: Maybe<Scalars['date']>;
  _nin?: Maybe<Array<Scalars['date']>>;
};

/** columns and relationships of "feed" */
export type Feed = {
  __typename?: 'feed';
  achievement_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  activity?: Maybe<Activities>;
  /** An object relationship */
  activityByActivityIdCreatedAtUserId?: Maybe<Activities>;
  activity_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  challenge?: Maybe<Challenge>;
  challenge_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  feedTypeByFeedType: Feed_Type;
  feed_type: Feed_Type_Enum;
  id: Scalars['Int'];
  /** An array relationship */
  likes: Array<Likes>;
  /** An aggregated array relationship */
  likes_aggregate: Likes_Aggregate;
  /** An object relationship */
  user?: Maybe<Users>;
  /** An object relationship */
  user_achievement?: Maybe<User_Achievement>;
  user_id?: Maybe<Scalars['String']>;
};

/** columns and relationships of "feed" */
export type FeedLikesArgs = {
  distinct_on?: Maybe<Array<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** columns and relationships of "feed" */
export type FeedLikes_AggregateArgs = {
  distinct_on?: Maybe<Array<Likes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Likes_Order_By>>;
  where?: Maybe<Likes_Bool_Exp>;
};

/** aggregated selection of "feed" */
export type Feed_Aggregate = {
  __typename?: 'feed_aggregate';
  aggregate?: Maybe<Feed_Aggregate_Fields>;
  nodes: Array<Feed>;
};

/** aggregate fields of "feed" */
export type Feed_Aggregate_Fields = {
  __typename?: 'feed_aggregate_fields';
  avg?: Maybe<Feed_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Feed_Max_Fields>;
  min?: Maybe<Feed_Min_Fields>;
  stddev?: Maybe<Feed_Stddev_Fields>;
  stddev_pop?: Maybe<Feed_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Feed_Stddev_Samp_Fields>;
  sum?: Maybe<Feed_Sum_Fields>;
  var_pop?: Maybe<Feed_Var_Pop_Fields>;
  var_samp?: Maybe<Feed_Var_Samp_Fields>;
  variance?: Maybe<Feed_Variance_Fields>;
};

/** aggregate fields of "feed" */
export type Feed_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Feed_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "feed" */
export type Feed_Aggregate_Order_By = {
  avg?: Maybe<Feed_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Feed_Max_Order_By>;
  min?: Maybe<Feed_Min_Order_By>;
  stddev?: Maybe<Feed_Stddev_Order_By>;
  stddev_pop?: Maybe<Feed_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Feed_Stddev_Samp_Order_By>;
  sum?: Maybe<Feed_Sum_Order_By>;
  var_pop?: Maybe<Feed_Var_Pop_Order_By>;
  var_samp?: Maybe<Feed_Var_Samp_Order_By>;
  variance?: Maybe<Feed_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "feed" */
export type Feed_Arr_Rel_Insert_Input = {
  data: Array<Feed_Insert_Input>;
  on_conflict?: Maybe<Feed_On_Conflict>;
};

/** aggregate avg on columns */
export type Feed_Avg_Fields = {
  __typename?: 'feed_avg_fields';
  achievement_id?: Maybe<Scalars['Float']>;
  activity_id?: Maybe<Scalars['Float']>;
  challenge_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "feed" */
export type Feed_Avg_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "feed". All fields are combined with a logical 'AND'. */
export type Feed_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Feed_Bool_Exp>>>;
  _not?: Maybe<Feed_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Feed_Bool_Exp>>>;
  achievement_id?: Maybe<Int_Comparison_Exp>;
  activity?: Maybe<Activities_Bool_Exp>;
  activityByActivityIdCreatedAtUserId?: Maybe<Activities_Bool_Exp>;
  activity_id?: Maybe<Int_Comparison_Exp>;
  challenge?: Maybe<Challenge_Bool_Exp>;
  challenge_id?: Maybe<Int_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  feedTypeByFeedType?: Maybe<Feed_Type_Bool_Exp>;
  feed_type?: Maybe<Feed_Type_Enum_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  likes?: Maybe<Likes_Bool_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_achievement?: Maybe<User_Achievement_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "feed" */
export enum Feed_Constraint {
  /** unique or primary key constraint */
  FeedAchievementIdUserIdKey = 'feed_achievement_id_user_id_key',
  /** unique or primary key constraint */
  FeedActivityIdUserIdKey = 'feed_activity_id_user_id_key',
  /** unique or primary key constraint */
  FeedChallengeIdUserIdKey = 'feed_challenge_id_user_id_key',
  /** unique or primary key constraint */
  FeedPkey = 'feed_pkey',
}

/** input type for incrementing integer column in table "feed" */
export type Feed_Inc_Input = {
  achievement_id?: Maybe<Scalars['Int']>;
  activity_id?: Maybe<Scalars['Int']>;
  challenge_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "feed" */
export type Feed_Insert_Input = {
  achievement_id?: Maybe<Scalars['Int']>;
  activity?: Maybe<Activities_Obj_Rel_Insert_Input>;
  activityByActivityIdCreatedAtUserId?: Maybe<Activities_Obj_Rel_Insert_Input>;
  activity_id?: Maybe<Scalars['Int']>;
  challenge?: Maybe<Challenge_Obj_Rel_Insert_Input>;
  challenge_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  feedTypeByFeedType?: Maybe<Feed_Type_Obj_Rel_Insert_Input>;
  feed_type?: Maybe<Feed_Type_Enum>;
  id?: Maybe<Scalars['Int']>;
  likes?: Maybe<Likes_Arr_Rel_Insert_Input>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_achievement?: Maybe<User_Achievement_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Feed_Max_Fields = {
  __typename?: 'feed_max_fields';
  achievement_id?: Maybe<Scalars['Int']>;
  activity_id?: Maybe<Scalars['Int']>;
  challenge_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "feed" */
export type Feed_Max_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Feed_Min_Fields = {
  __typename?: 'feed_min_fields';
  achievement_id?: Maybe<Scalars['Int']>;
  activity_id?: Maybe<Scalars['Int']>;
  challenge_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "feed" */
export type Feed_Min_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "feed" */
export type Feed_Mutation_Response = {
  __typename?: 'feed_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Feed>;
};

/** input type for inserting object relation for remote table "feed" */
export type Feed_Obj_Rel_Insert_Input = {
  data: Feed_Insert_Input;
  on_conflict?: Maybe<Feed_On_Conflict>;
};

/** on conflict condition type for table "feed" */
export type Feed_On_Conflict = {
  constraint: Feed_Constraint;
  update_columns: Array<Feed_Update_Column>;
  where?: Maybe<Feed_Bool_Exp>;
};

/** ordering options when selecting data from "feed" */
export type Feed_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity?: Maybe<Activities_Order_By>;
  activityByActivityIdCreatedAtUserId?: Maybe<Activities_Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge?: Maybe<Challenge_Order_By>;
  challenge_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  feedTypeByFeedType?: Maybe<Feed_Type_Order_By>;
  feed_type?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  likes_aggregate?: Maybe<Likes_Aggregate_Order_By>;
  user?: Maybe<Users_Order_By>;
  user_achievement?: Maybe<User_Achievement_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "feed" */
export type Feed_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "feed" */
export enum Feed_Select_Column {
  /** column name */
  AchievementId = 'achievement_id',
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  ChallengeId = 'challenge_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FeedType = 'feed_type',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "feed" */
export type Feed_Set_Input = {
  achievement_id?: Maybe<Scalars['Int']>;
  activity_id?: Maybe<Scalars['Int']>;
  challenge_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  feed_type?: Maybe<Feed_Type_Enum>;
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Feed_Stddev_Fields = {
  __typename?: 'feed_stddev_fields';
  achievement_id?: Maybe<Scalars['Float']>;
  activity_id?: Maybe<Scalars['Float']>;
  challenge_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "feed" */
export type Feed_Stddev_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Feed_Stddev_Pop_Fields = {
  __typename?: 'feed_stddev_pop_fields';
  achievement_id?: Maybe<Scalars['Float']>;
  activity_id?: Maybe<Scalars['Float']>;
  challenge_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "feed" */
export type Feed_Stddev_Pop_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Feed_Stddev_Samp_Fields = {
  __typename?: 'feed_stddev_samp_fields';
  achievement_id?: Maybe<Scalars['Float']>;
  activity_id?: Maybe<Scalars['Float']>;
  challenge_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "feed" */
export type Feed_Stddev_Samp_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Feed_Sum_Fields = {
  __typename?: 'feed_sum_fields';
  achievement_id?: Maybe<Scalars['Int']>;
  activity_id?: Maybe<Scalars['Int']>;
  challenge_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "feed" */
export type Feed_Sum_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** columns and relationships of "feed_type" */
export type Feed_Type = {
  __typename?: 'feed_type';
  /** An array relationship */
  feeds: Array<Feed>;
  /** An aggregated array relationship */
  feeds_aggregate: Feed_Aggregate;
  name: Scalars['String'];
};

/** columns and relationships of "feed_type" */
export type Feed_TypeFeedsArgs = {
  distinct_on?: Maybe<Array<Feed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Order_By>>;
  where?: Maybe<Feed_Bool_Exp>;
};

/** columns and relationships of "feed_type" */
export type Feed_TypeFeeds_AggregateArgs = {
  distinct_on?: Maybe<Array<Feed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Order_By>>;
  where?: Maybe<Feed_Bool_Exp>;
};

/** aggregated selection of "feed_type" */
export type Feed_Type_Aggregate = {
  __typename?: 'feed_type_aggregate';
  aggregate?: Maybe<Feed_Type_Aggregate_Fields>;
  nodes: Array<Feed_Type>;
};

/** aggregate fields of "feed_type" */
export type Feed_Type_Aggregate_Fields = {
  __typename?: 'feed_type_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Feed_Type_Max_Fields>;
  min?: Maybe<Feed_Type_Min_Fields>;
};

/** aggregate fields of "feed_type" */
export type Feed_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Feed_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "feed_type" */
export type Feed_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Feed_Type_Max_Order_By>;
  min?: Maybe<Feed_Type_Min_Order_By>;
};

/** input type for inserting array relation for remote table "feed_type" */
export type Feed_Type_Arr_Rel_Insert_Input = {
  data: Array<Feed_Type_Insert_Input>;
  on_conflict?: Maybe<Feed_Type_On_Conflict>;
};

/** Boolean expression to filter rows from the table "feed_type". All fields are combined with a logical 'AND'. */
export type Feed_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Feed_Type_Bool_Exp>>>;
  _not?: Maybe<Feed_Type_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Feed_Type_Bool_Exp>>>;
  feeds?: Maybe<Feed_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "feed_type" */
export enum Feed_Type_Constraint {
  /** unique or primary key constraint */
  FeedTypePkey = 'feed_type_pkey',
}

export enum Feed_Type_Enum {
  Achievement = 'ACHIEVEMENT',
  Activity = 'ACTIVITY',
  Challenge = 'CHALLENGE',
}

/** expression to compare columns of type feed_type_enum. All fields are combined with logical 'AND'. */
export type Feed_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Feed_Type_Enum>;
  _in?: Maybe<Array<Feed_Type_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Feed_Type_Enum>;
  _nin?: Maybe<Array<Feed_Type_Enum>>;
};

/** input type for inserting data into table "feed_type" */
export type Feed_Type_Insert_Input = {
  feeds?: Maybe<Feed_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Feed_Type_Max_Fields = {
  __typename?: 'feed_type_max_fields';
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "feed_type" */
export type Feed_Type_Max_Order_By = {
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Feed_Type_Min_Fields = {
  __typename?: 'feed_type_min_fields';
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "feed_type" */
export type Feed_Type_Min_Order_By = {
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "feed_type" */
export type Feed_Type_Mutation_Response = {
  __typename?: 'feed_type_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Feed_Type>;
};

/** input type for inserting object relation for remote table "feed_type" */
export type Feed_Type_Obj_Rel_Insert_Input = {
  data: Feed_Type_Insert_Input;
  on_conflict?: Maybe<Feed_Type_On_Conflict>;
};

/** on conflict condition type for table "feed_type" */
export type Feed_Type_On_Conflict = {
  constraint: Feed_Type_Constraint;
  update_columns: Array<Feed_Type_Update_Column>;
  where?: Maybe<Feed_Type_Bool_Exp>;
};

/** ordering options when selecting data from "feed_type" */
export type Feed_Type_Order_By = {
  feeds_aggregate?: Maybe<Feed_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "feed_type" */
export type Feed_Type_Pk_Columns_Input = {
  name: Scalars['String'];
};

/** select columns of table "feed_type" */
export enum Feed_Type_Select_Column {
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "feed_type" */
export type Feed_Type_Set_Input = {
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "feed_type" */
export enum Feed_Type_Update_Column {
  /** column name */
  Name = 'name',
}

/** update columns of table "feed" */
export enum Feed_Update_Column {
  /** column name */
  AchievementId = 'achievement_id',
  /** column name */
  ActivityId = 'activity_id',
  /** column name */
  ChallengeId = 'challenge_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FeedType = 'feed_type',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Feed_Var_Pop_Fields = {
  __typename?: 'feed_var_pop_fields';
  achievement_id?: Maybe<Scalars['Float']>;
  activity_id?: Maybe<Scalars['Float']>;
  challenge_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "feed" */
export type Feed_Var_Pop_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Feed_Var_Samp_Fields = {
  __typename?: 'feed_var_samp_fields';
  achievement_id?: Maybe<Scalars['Float']>;
  activity_id?: Maybe<Scalars['Float']>;
  challenge_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "feed" */
export type Feed_Var_Samp_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Feed_Variance_Fields = {
  __typename?: 'feed_variance_fields';
  achievement_id?: Maybe<Scalars['Float']>;
  activity_id?: Maybe<Scalars['Float']>;
  challenge_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "feed" */
export type Feed_Variance_Order_By = {
  achievement_id?: Maybe<Order_By>;
  activity_id?: Maybe<Order_By>;
  challenge_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
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

/** columns and relationships of "friend_tracking" */
export type Friend_Tracking = {
  __typename?: 'friend_tracking';
  created_at: Scalars['timestamptz'];
  geofence_id: Scalars['Int'];
  id: Scalars['Int'];
  join_limit?: Maybe<Scalars['timestamptz']>;
  linking_word: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user_join?: Maybe<Users>;
  user_join_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  user_start: Users;
  user_start_id: Scalars['String'];
};

/** aggregated selection of "friend_tracking" */
export type Friend_Tracking_Aggregate = {
  __typename?: 'friend_tracking_aggregate';
  aggregate?: Maybe<Friend_Tracking_Aggregate_Fields>;
  nodes: Array<Friend_Tracking>;
};

/** aggregate fields of "friend_tracking" */
export type Friend_Tracking_Aggregate_Fields = {
  __typename?: 'friend_tracking_aggregate_fields';
  avg?: Maybe<Friend_Tracking_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Friend_Tracking_Max_Fields>;
  min?: Maybe<Friend_Tracking_Min_Fields>;
  stddev?: Maybe<Friend_Tracking_Stddev_Fields>;
  stddev_pop?: Maybe<Friend_Tracking_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Friend_Tracking_Stddev_Samp_Fields>;
  sum?: Maybe<Friend_Tracking_Sum_Fields>;
  var_pop?: Maybe<Friend_Tracking_Var_Pop_Fields>;
  var_samp?: Maybe<Friend_Tracking_Var_Samp_Fields>;
  variance?: Maybe<Friend_Tracking_Variance_Fields>;
};

/** aggregate fields of "friend_tracking" */
export type Friend_Tracking_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Friend_Tracking_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "friend_tracking" */
export type Friend_Tracking_Aggregate_Order_By = {
  avg?: Maybe<Friend_Tracking_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Friend_Tracking_Max_Order_By>;
  min?: Maybe<Friend_Tracking_Min_Order_By>;
  stddev?: Maybe<Friend_Tracking_Stddev_Order_By>;
  stddev_pop?: Maybe<Friend_Tracking_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Friend_Tracking_Stddev_Samp_Order_By>;
  sum?: Maybe<Friend_Tracking_Sum_Order_By>;
  var_pop?: Maybe<Friend_Tracking_Var_Pop_Order_By>;
  var_samp?: Maybe<Friend_Tracking_Var_Samp_Order_By>;
  variance?: Maybe<Friend_Tracking_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "friend_tracking" */
export type Friend_Tracking_Arr_Rel_Insert_Input = {
  data: Array<Friend_Tracking_Insert_Input>;
  on_conflict?: Maybe<Friend_Tracking_On_Conflict>;
};

/** aggregate avg on columns */
export type Friend_Tracking_Avg_Fields = {
  __typename?: 'friend_tracking_avg_fields';
  geofence_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "friend_tracking" */
export type Friend_Tracking_Avg_Order_By = {
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "friend_tracking". All fields are combined with a logical 'AND'. */
export type Friend_Tracking_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Friend_Tracking_Bool_Exp>>>;
  _not?: Maybe<Friend_Tracking_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Friend_Tracking_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  geofence_id?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  join_limit?: Maybe<Timestamptz_Comparison_Exp>;
  linking_word?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_join?: Maybe<Users_Bool_Exp>;
  user_join_id?: Maybe<String_Comparison_Exp>;
  user_start?: Maybe<Users_Bool_Exp>;
  user_start_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "friend_tracking" */
export enum Friend_Tracking_Constraint {
  /** unique or primary key constraint */
  FriendsTrackingPkey = 'friends_tracking_pkey',
}

/** input type for incrementing integer column in table "friend_tracking" */
export type Friend_Tracking_Inc_Input = {
  geofence_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "friend_tracking" */
export type Friend_Tracking_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  geofence_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  join_limit?: Maybe<Scalars['timestamptz']>;
  linking_word?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_join?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_join_id?: Maybe<Scalars['String']>;
  user_start?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_start_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Friend_Tracking_Max_Fields = {
  __typename?: 'friend_tracking_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  geofence_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  join_limit?: Maybe<Scalars['timestamptz']>;
  linking_word?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_join_id?: Maybe<Scalars['String']>;
  user_start_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "friend_tracking" */
export type Friend_Tracking_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  join_limit?: Maybe<Order_By>;
  linking_word?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_join_id?: Maybe<Order_By>;
  user_start_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Friend_Tracking_Min_Fields = {
  __typename?: 'friend_tracking_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  geofence_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  join_limit?: Maybe<Scalars['timestamptz']>;
  linking_word?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_join_id?: Maybe<Scalars['String']>;
  user_start_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "friend_tracking" */
export type Friend_Tracking_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  join_limit?: Maybe<Order_By>;
  linking_word?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_join_id?: Maybe<Order_By>;
  user_start_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "friend_tracking" */
export type Friend_Tracking_Mutation_Response = {
  __typename?: 'friend_tracking_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Friend_Tracking>;
};

/** input type for inserting object relation for remote table "friend_tracking" */
export type Friend_Tracking_Obj_Rel_Insert_Input = {
  data: Friend_Tracking_Insert_Input;
  on_conflict?: Maybe<Friend_Tracking_On_Conflict>;
};

/** on conflict condition type for table "friend_tracking" */
export type Friend_Tracking_On_Conflict = {
  constraint: Friend_Tracking_Constraint;
  update_columns: Array<Friend_Tracking_Update_Column>;
  where?: Maybe<Friend_Tracking_Bool_Exp>;
};

/** ordering options when selecting data from "friend_tracking" */
export type Friend_Tracking_Order_By = {
  created_at?: Maybe<Order_By>;
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  join_limit?: Maybe<Order_By>;
  linking_word?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_join?: Maybe<Users_Order_By>;
  user_join_id?: Maybe<Order_By>;
  user_start?: Maybe<Users_Order_By>;
  user_start_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "friend_tracking" */
export type Friend_Tracking_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "friend_tracking" */
export enum Friend_Tracking_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GeofenceId = 'geofence_id',
  /** column name */
  Id = 'id',
  /** column name */
  JoinLimit = 'join_limit',
  /** column name */
  LinkingWord = 'linking_word',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserJoinId = 'user_join_id',
  /** column name */
  UserStartId = 'user_start_id',
}

/** input type for updating data in table "friend_tracking" */
export type Friend_Tracking_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  geofence_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  join_limit?: Maybe<Scalars['timestamptz']>;
  linking_word?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_join_id?: Maybe<Scalars['String']>;
  user_start_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Friend_Tracking_Stddev_Fields = {
  __typename?: 'friend_tracking_stddev_fields';
  geofence_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "friend_tracking" */
export type Friend_Tracking_Stddev_Order_By = {
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Friend_Tracking_Stddev_Pop_Fields = {
  __typename?: 'friend_tracking_stddev_pop_fields';
  geofence_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "friend_tracking" */
export type Friend_Tracking_Stddev_Pop_Order_By = {
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Friend_Tracking_Stddev_Samp_Fields = {
  __typename?: 'friend_tracking_stddev_samp_fields';
  geofence_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "friend_tracking" */
export type Friend_Tracking_Stddev_Samp_Order_By = {
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Friend_Tracking_Sum_Fields = {
  __typename?: 'friend_tracking_sum_fields';
  geofence_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "friend_tracking" */
export type Friend_Tracking_Sum_Order_By = {
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** update columns of table "friend_tracking" */
export enum Friend_Tracking_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GeofenceId = 'geofence_id',
  /** column name */
  Id = 'id',
  /** column name */
  JoinLimit = 'join_limit',
  /** column name */
  LinkingWord = 'linking_word',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserJoinId = 'user_join_id',
  /** column name */
  UserStartId = 'user_start_id',
}

/** aggregate var_pop on columns */
export type Friend_Tracking_Var_Pop_Fields = {
  __typename?: 'friend_tracking_var_pop_fields';
  geofence_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "friend_tracking" */
export type Friend_Tracking_Var_Pop_Order_By = {
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Friend_Tracking_Var_Samp_Fields = {
  __typename?: 'friend_tracking_var_samp_fields';
  geofence_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "friend_tracking" */
export type Friend_Tracking_Var_Samp_Order_By = {
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Friend_Tracking_Variance_Fields = {
  __typename?: 'friend_tracking_variance_fields';
  geofence_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "friend_tracking" */
export type Friend_Tracking_Variance_Order_By = {
  geofence_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** columns and relationships of "geofence_variants" */
export type Geofence_Variants = {
  __typename?: 'geofence_variants';
  description?: Maybe<Scalars['String']>;
  /** An array relationship */
  geofences: Array<Geofences>;
  /** An aggregated array relationship */
  geofences_aggregate: Geofences_Aggregate;
  name: Scalars['String'];
};

/** columns and relationships of "geofence_variants" */
export type Geofence_VariantsGeofencesArgs = {
  distinct_on?: Maybe<Array<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
};

/** columns and relationships of "geofence_variants" */
export type Geofence_VariantsGeofences_AggregateArgs = {
  distinct_on?: Maybe<Array<Geofences_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Geofences_Order_By>>;
  where?: Maybe<Geofences_Bool_Exp>;
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
  geofences?: Maybe<Geofences_Bool_Exp>;
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
  geofences?: Maybe<Geofences_Arr_Rel_Insert_Input>;
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
  geofences_aggregate?: Maybe<Geofences_Aggregate_Order_By>;
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
  /** An array relationship */
  activities: Array<Activities>;
  /** An aggregated array relationship */
  activities_aggregate: Activities_Aggregate;
  category: Scalars['String'];
  /** Only for polygons */
  coordinates?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  /** An object relationship */
  geofenceByCategory: Categories;
  /** An object relationship */
  geofence_variant: Geofence_Variants;
  id: Scalars['Int'];
  latitude: Scalars['float8'];
  longitude: Scalars['float8'];
  name: Scalars['String'];
  radius: Scalars['float8'];
  updated_at: Scalars['timestamptz'];
  variant: Geofence_Variants_Enum;
};

/** columns and relationships of "geofences" */
export type GeofencesActivitiesArgs = {
  distinct_on?: Maybe<Array<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
};

/** columns and relationships of "geofences" */
export type GeofencesActivities_AggregateArgs = {
  distinct_on?: Maybe<Array<Activities_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Activities_Order_By>>;
  where?: Maybe<Activities_Bool_Exp>;
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
  activities?: Maybe<Activities_Bool_Exp>;
  category?: Maybe<String_Comparison_Exp>;
  coordinates?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  geofenceByCategory?: Maybe<Categories_Bool_Exp>;
  geofence_variant?: Maybe<Geofence_Variants_Bool_Exp>;
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
  id?: Maybe<Scalars['Int']>;
  latitude?: Maybe<Scalars['float8']>;
  longitude?: Maybe<Scalars['float8']>;
  radius?: Maybe<Scalars['float8']>;
};

/** input type for inserting data into table "geofences" */
export type Geofences_Insert_Input = {
  activities?: Maybe<Activities_Arr_Rel_Insert_Input>;
  category?: Maybe<Scalars['String']>;
  coordinates?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  geofenceByCategory?: Maybe<Categories_Obj_Rel_Insert_Input>;
  geofence_variant?: Maybe<Geofence_Variants_Obj_Rel_Insert_Input>;
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
  category?: Maybe<Scalars['String']>;
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
};

/** aggregate min on columns */
export type Geofences_Min_Fields = {
  __typename?: 'geofences_min_fields';
  category?: Maybe<Scalars['String']>;
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
  activities_aggregate?: Maybe<Activities_Aggregate_Order_By>;
  category?: Maybe<Order_By>;
  coordinates?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  geofenceByCategory?: Maybe<Categories_Order_By>;
  geofence_variant?: Maybe<Geofence_Variants_Order_By>;
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
  category?: Maybe<Scalars['String']>;
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

/** expression to compare columns of type interval. All fields are combined with logical 'AND'. */
export type Interval_Comparison_Exp = {
  _eq?: Maybe<Scalars['interval']>;
  _gt?: Maybe<Scalars['interval']>;
  _gte?: Maybe<Scalars['interval']>;
  _in?: Maybe<Array<Scalars['interval']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['interval']>;
  _lte?: Maybe<Scalars['interval']>;
  _neq?: Maybe<Scalars['interval']>;
  _nin?: Maybe<Array<Scalars['interval']>>;
};

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
};

/** columns and relationships of "likes" */
export type Likes = {
  __typename?: 'likes';
  created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  feed: Feed;
  feed_id: Scalars['Int'];
  updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
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
  feed_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "likes" */
export type Likes_Avg_Order_By = {
  feed_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "likes". All fields are combined with a logical 'AND'. */
export type Likes_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Likes_Bool_Exp>>>;
  _not?: Maybe<Likes_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Likes_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  feed?: Maybe<Feed_Bool_Exp>;
  feed_id?: Maybe<Int_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "likes" */
export enum Likes_Constraint {
  /** unique or primary key constraint */
  LikesUserIdActivityIdKey = 'Likes_user_id_activity_id_key',
  /** unique or primary key constraint */
  LikesPkey = 'likes_pkey',
}

/** input type for incrementing integer column in table "likes" */
export type Likes_Inc_Input = {
  feed_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "likes" */
export type Likes_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  feed?: Maybe<Feed_Obj_Rel_Insert_Input>;
  feed_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Likes_Max_Fields = {
  __typename?: 'likes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  feed_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "likes" */
export type Likes_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  feed_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Likes_Min_Fields = {
  __typename?: 'likes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  feed_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "likes" */
export type Likes_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  feed_id?: Maybe<Order_By>;
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
  created_at?: Maybe<Order_By>;
  feed?: Maybe<Feed_Order_By>;
  feed_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "likes" */
export type Likes_Pk_Columns_Input = {
  feed_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** select columns of table "likes" */
export enum Likes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FeedId = 'feed_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "likes" */
export type Likes_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  feed_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Likes_Stddev_Fields = {
  __typename?: 'likes_stddev_fields';
  feed_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "likes" */
export type Likes_Stddev_Order_By = {
  feed_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Likes_Stddev_Pop_Fields = {
  __typename?: 'likes_stddev_pop_fields';
  feed_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "likes" */
export type Likes_Stddev_Pop_Order_By = {
  feed_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Likes_Stddev_Samp_Fields = {
  __typename?: 'likes_stddev_samp_fields';
  feed_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "likes" */
export type Likes_Stddev_Samp_Order_By = {
  feed_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Likes_Sum_Fields = {
  __typename?: 'likes_sum_fields';
  feed_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "likes" */
export type Likes_Sum_Order_By = {
  feed_id?: Maybe<Order_By>;
};

/** update columns of table "likes" */
export enum Likes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FeedId = 'feed_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Likes_Var_Pop_Fields = {
  __typename?: 'likes_var_pop_fields';
  feed_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "likes" */
export type Likes_Var_Pop_Order_By = {
  feed_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Likes_Var_Samp_Fields = {
  __typename?: 'likes_var_samp_fields';
  feed_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "likes" */
export type Likes_Var_Samp_Order_By = {
  feed_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Likes_Variance_Fields = {
  __typename?: 'likes_variance_fields';
  feed_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "likes" */
export type Likes_Variance_Order_By = {
  feed_id?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "achievement" */
  delete_achievement?: Maybe<Achievement_Mutation_Response>;
  /** delete single row from the table: "achievement" */
  delete_achievement_by_pk?: Maybe<Achievement>;
  /** delete data from the table: "achievement_type" */
  delete_achievement_type?: Maybe<Achievement_Type_Mutation_Response>;
  /** delete single row from the table: "achievement_type" */
  delete_achievement_type_by_pk?: Maybe<Achievement_Type>;
  /** delete data from the table: "activities" */
  delete_activities?: Maybe<Activities_Mutation_Response>;
  /** delete single row from the table: "activities" */
  delete_activities_by_pk?: Maybe<Activities>;
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete single row from the table: "categories" */
  delete_categories_by_pk?: Maybe<Categories>;
  /** delete data from the table: "challenge" */
  delete_challenge?: Maybe<Challenge_Mutation_Response>;
  /** delete single row from the table: "challenge" */
  delete_challenge_by_pk?: Maybe<Challenge>;
  /** delete data from the table: "challenge_participant" */
  delete_challenge_participant?: Maybe<Challenge_Participant_Mutation_Response>;
  /** delete single row from the table: "challenge_participant" */
  delete_challenge_participant_by_pk?: Maybe<Challenge_Participant>;
  /** delete data from the table: "challenge_participant_state" */
  delete_challenge_participant_state?: Maybe<Challenge_Participant_State_Mutation_Response>;
  /** delete single row from the table: "challenge_participant_state" */
  delete_challenge_participant_state_by_pk?: Maybe<Challenge_Participant_State>;
  /** delete data from the table: "challenge_state" */
  delete_challenge_state?: Maybe<Challenge_State_Mutation_Response>;
  /** delete single row from the table: "challenge_state" */
  delete_challenge_state_by_pk?: Maybe<Challenge_State>;
  /** delete data from the table: "challenge_type" */
  delete_challenge_type?: Maybe<Challenge_Type_Mutation_Response>;
  /** delete single row from the table: "challenge_type" */
  delete_challenge_type_by_pk?: Maybe<Challenge_Type>;
  /** delete single row from the table: "comments" */
  delete_comment?: Maybe<Comments>;
  /** delete data from the table: "comments" */
  delete_comments?: Maybe<Comments_Mutation_Response>;
  /** delete data from the table: "feed" */
  delete_feed?: Maybe<Feed_Mutation_Response>;
  /** delete single row from the table: "feed" */
  delete_feed_by_pk?: Maybe<Feed>;
  /** delete data from the table: "feed_type" */
  delete_feed_type?: Maybe<Feed_Type_Mutation_Response>;
  /** delete single row from the table: "feed_type" */
  delete_feed_type_by_pk?: Maybe<Feed_Type>;
  /** delete data from the table: "followings" */
  delete_followings?: Maybe<Followings_Mutation_Response>;
  /** delete single row from the table: "followings" */
  delete_followings_by_pk?: Maybe<Followings>;
  /** delete data from the table: "friend_tracking" */
  delete_friend_tracking?: Maybe<Friend_Tracking_Mutation_Response>;
  /** delete single row from the table: "friend_tracking" */
  delete_friend_tracking_by_pk?: Maybe<Friend_Tracking>;
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
  /** delete data from the table: "notification_type" */
  delete_notification_type?: Maybe<Notification_Type_Mutation_Response>;
  /** delete single row from the table: "notification_type" */
  delete_notification_type_by_pk?: Maybe<Notification_Type>;
  /** delete data from the table: "notifications" */
  delete_notifications?: Maybe<Notifications_Mutation_Response>;
  /** delete single row from the table: "notifications" */
  delete_notifications_by_pk?: Maybe<Notifications>;
  /** delete single row from the table: "users" */
  delete_user?: Maybe<Users>;
  /** delete data from the table: "user_achievement" */
  delete_user_achievement?: Maybe<User_Achievement_Mutation_Response>;
  /** delete single row from the table: "user_achievement" */
  delete_user_achievement_by_pk?: Maybe<User_Achievement>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** insert data into the table: "achievement" */
  insert_achievement?: Maybe<Achievement_Mutation_Response>;
  /** insert a single row into the table: "achievement" */
  insert_achievement_one?: Maybe<Achievement>;
  /** insert data into the table: "achievement_type" */
  insert_achievement_type?: Maybe<Achievement_Type_Mutation_Response>;
  /** insert a single row into the table: "achievement_type" */
  insert_achievement_type_one?: Maybe<Achievement_Type>;
  /** insert data into the table: "activities" */
  insert_activities?: Maybe<Activities_Mutation_Response>;
  /** insert a single row into the table: "activities" */
  insert_activities_one?: Maybe<Activities>;
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert a single row into the table: "categories" */
  insert_categories_one?: Maybe<Categories>;
  /** insert data into the table: "challenge" */
  insert_challenge?: Maybe<Challenge_Mutation_Response>;
  /** insert a single row into the table: "challenge" */
  insert_challenge_one?: Maybe<Challenge>;
  /** insert data into the table: "challenge_participant" */
  insert_challenge_participant?: Maybe<Challenge_Participant_Mutation_Response>;
  /** insert a single row into the table: "challenge_participant" */
  insert_challenge_participant_one?: Maybe<Challenge_Participant>;
  /** insert data into the table: "challenge_participant_state" */
  insert_challenge_participant_state?: Maybe<Challenge_Participant_State_Mutation_Response>;
  /** insert a single row into the table: "challenge_participant_state" */
  insert_challenge_participant_state_one?: Maybe<Challenge_Participant_State>;
  /** insert data into the table: "challenge_state" */
  insert_challenge_state?: Maybe<Challenge_State_Mutation_Response>;
  /** insert a single row into the table: "challenge_state" */
  insert_challenge_state_one?: Maybe<Challenge_State>;
  /** insert data into the table: "challenge_type" */
  insert_challenge_type?: Maybe<Challenge_Type_Mutation_Response>;
  /** insert a single row into the table: "challenge_type" */
  insert_challenge_type_one?: Maybe<Challenge_Type>;
  /** insert a single row into the table: "comments" */
  insert_comment?: Maybe<Comments>;
  /** insert data into the table: "comments" */
  insert_comments?: Maybe<Comments_Mutation_Response>;
  /** insert data into the table: "feed" */
  insert_feed?: Maybe<Feed_Mutation_Response>;
  /** insert a single row into the table: "feed" */
  insert_feed_one?: Maybe<Feed>;
  /** insert data into the table: "feed_type" */
  insert_feed_type?: Maybe<Feed_Type_Mutation_Response>;
  /** insert a single row into the table: "feed_type" */
  insert_feed_type_one?: Maybe<Feed_Type>;
  /** insert data into the table: "followings" */
  insert_followings?: Maybe<Followings_Mutation_Response>;
  /** insert a single row into the table: "followings" */
  insert_followings_one?: Maybe<Followings>;
  /** insert data into the table: "friend_tracking" */
  insert_friend_tracking?: Maybe<Friend_Tracking_Mutation_Response>;
  /** insert a single row into the table: "friend_tracking" */
  insert_friend_tracking_one?: Maybe<Friend_Tracking>;
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
  /** insert data into the table: "notification_type" */
  insert_notification_type?: Maybe<Notification_Type_Mutation_Response>;
  /** insert a single row into the table: "notification_type" */
  insert_notification_type_one?: Maybe<Notification_Type>;
  /** insert data into the table: "notifications" */
  insert_notifications?: Maybe<Notifications_Mutation_Response>;
  /** insert a single row into the table: "notifications" */
  insert_notifications_one?: Maybe<Notifications>;
  /** insert a single row into the table: "users" */
  insert_user?: Maybe<Users>;
  /** insert data into the table: "user_achievement" */
  insert_user_achievement?: Maybe<User_Achievement_Mutation_Response>;
  /** insert a single row into the table: "user_achievement" */
  insert_user_achievement_one?: Maybe<User_Achievement>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** update data of the table: "achievement" */
  update_achievement?: Maybe<Achievement_Mutation_Response>;
  /** update single row of the table: "achievement" */
  update_achievement_by_pk?: Maybe<Achievement>;
  /** update data of the table: "achievement_type" */
  update_achievement_type?: Maybe<Achievement_Type_Mutation_Response>;
  /** update single row of the table: "achievement_type" */
  update_achievement_type_by_pk?: Maybe<Achievement_Type>;
  /** update data of the table: "activities" */
  update_activities?: Maybe<Activities_Mutation_Response>;
  /** update single row of the table: "activities" */
  update_activities_by_pk?: Maybe<Activities>;
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>;
  /** update single row of the table: "categories" */
  update_categories_by_pk?: Maybe<Categories>;
  /** update data of the table: "challenge" */
  update_challenge?: Maybe<Challenge_Mutation_Response>;
  /** update single row of the table: "challenge" */
  update_challenge_by_pk?: Maybe<Challenge>;
  /** update data of the table: "challenge_participant" */
  update_challenge_participant?: Maybe<Challenge_Participant_Mutation_Response>;
  /** update single row of the table: "challenge_participant" */
  update_challenge_participant_by_pk?: Maybe<Challenge_Participant>;
  /** update data of the table: "challenge_participant_state" */
  update_challenge_participant_state?: Maybe<Challenge_Participant_State_Mutation_Response>;
  /** update single row of the table: "challenge_participant_state" */
  update_challenge_participant_state_by_pk?: Maybe<Challenge_Participant_State>;
  /** update data of the table: "challenge_state" */
  update_challenge_state?: Maybe<Challenge_State_Mutation_Response>;
  /** update single row of the table: "challenge_state" */
  update_challenge_state_by_pk?: Maybe<Challenge_State>;
  /** update data of the table: "challenge_type" */
  update_challenge_type?: Maybe<Challenge_Type_Mutation_Response>;
  /** update single row of the table: "challenge_type" */
  update_challenge_type_by_pk?: Maybe<Challenge_Type>;
  /** update single row of the table: "comments" */
  update_comment?: Maybe<Comments>;
  /** update data of the table: "comments" */
  update_comments?: Maybe<Comments_Mutation_Response>;
  /** update data of the table: "feed" */
  update_feed?: Maybe<Feed_Mutation_Response>;
  /** update single row of the table: "feed" */
  update_feed_by_pk?: Maybe<Feed>;
  /** update data of the table: "feed_type" */
  update_feed_type?: Maybe<Feed_Type_Mutation_Response>;
  /** update single row of the table: "feed_type" */
  update_feed_type_by_pk?: Maybe<Feed_Type>;
  /** update data of the table: "followings" */
  update_followings?: Maybe<Followings_Mutation_Response>;
  /** update single row of the table: "followings" */
  update_followings_by_pk?: Maybe<Followings>;
  /** update data of the table: "friend_tracking" */
  update_friend_tracking?: Maybe<Friend_Tracking_Mutation_Response>;
  /** update single row of the table: "friend_tracking" */
  update_friend_tracking_by_pk?: Maybe<Friend_Tracking>;
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
  /** update data of the table: "notification_type" */
  update_notification_type?: Maybe<Notification_Type_Mutation_Response>;
  /** update single row of the table: "notification_type" */
  update_notification_type_by_pk?: Maybe<Notification_Type>;
  /** update data of the table: "notifications" */
  update_notifications?: Maybe<Notifications_Mutation_Response>;
  /** update single row of the table: "notifications" */
  update_notifications_by_pk?: Maybe<Notifications>;
  /** update single row of the table: "users" */
  update_user?: Maybe<Users>;
  /** update data of the table: "user_achievement" */
  update_user_achievement?: Maybe<User_Achievement_Mutation_Response>;
  /** update single row of the table: "user_achievement" */
  update_user_achievement_by_pk?: Maybe<User_Achievement>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
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
export type Mutation_RootDelete_Challenge_Participant_StateArgs = {
  where: Challenge_Participant_State_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Challenge_Participant_State_By_PkArgs = {
  state: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_Challenge_StateArgs = {
  where: Challenge_State_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Challenge_State_By_PkArgs = {
  state: Scalars['String'];
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
export type Mutation_RootDelete_FeedArgs = {
  where: Feed_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Feed_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_Feed_TypeArgs = {
  where: Feed_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Feed_Type_By_PkArgs = {
  name: Scalars['String'];
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
export type Mutation_RootDelete_Friend_TrackingArgs = {
  where: Friend_Tracking_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Friend_Tracking_By_PkArgs = {
  id: Scalars['Int'];
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
  feed_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_Notification_TypeArgs = {
  where: Notification_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Notification_Type_By_PkArgs = {
  type: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_NotificationsArgs = {
  where: Notifications_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Notifications_By_PkArgs = {
  id: Scalars['Int'];
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
  objects: Array<Achievement_Insert_Input>;
  on_conflict?: Maybe<Achievement_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Achievement_OneArgs = {
  object: Achievement_Insert_Input;
  on_conflict?: Maybe<Achievement_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Achievement_TypeArgs = {
  objects: Array<Achievement_Type_Insert_Input>;
  on_conflict?: Maybe<Achievement_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Achievement_Type_OneArgs = {
  object: Achievement_Type_Insert_Input;
  on_conflict?: Maybe<Achievement_Type_On_Conflict>;
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
export type Mutation_RootInsert_ChallengeArgs = {
  objects: Array<Challenge_Insert_Input>;
  on_conflict?: Maybe<Challenge_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_OneArgs = {
  object: Challenge_Insert_Input;
  on_conflict?: Maybe<Challenge_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_ParticipantArgs = {
  objects: Array<Challenge_Participant_Insert_Input>;
  on_conflict?: Maybe<Challenge_Participant_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_Participant_OneArgs = {
  object: Challenge_Participant_Insert_Input;
  on_conflict?: Maybe<Challenge_Participant_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_Participant_StateArgs = {
  objects: Array<Challenge_Participant_State_Insert_Input>;
  on_conflict?: Maybe<Challenge_Participant_State_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_Participant_State_OneArgs = {
  object: Challenge_Participant_State_Insert_Input;
  on_conflict?: Maybe<Challenge_Participant_State_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_StateArgs = {
  objects: Array<Challenge_State_Insert_Input>;
  on_conflict?: Maybe<Challenge_State_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_State_OneArgs = {
  object: Challenge_State_Insert_Input;
  on_conflict?: Maybe<Challenge_State_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Challenge_TypeArgs = {
  objects: Array<Challenge_Type_Insert_Input>;
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
  objects: Array<Comments_Insert_Input>;
  on_conflict?: Maybe<Comments_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_FeedArgs = {
  objects: Array<Feed_Insert_Input>;
  on_conflict?: Maybe<Feed_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Feed_OneArgs = {
  object: Feed_Insert_Input;
  on_conflict?: Maybe<Feed_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Feed_TypeArgs = {
  objects: Array<Feed_Type_Insert_Input>;
  on_conflict?: Maybe<Feed_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Feed_Type_OneArgs = {
  object: Feed_Type_Insert_Input;
  on_conflict?: Maybe<Feed_Type_On_Conflict>;
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
export type Mutation_RootInsert_Friend_TrackingArgs = {
  objects: Array<Friend_Tracking_Insert_Input>;
  on_conflict?: Maybe<Friend_Tracking_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Friend_Tracking_OneArgs = {
  object: Friend_Tracking_Insert_Input;
  on_conflict?: Maybe<Friend_Tracking_On_Conflict>;
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
export type Mutation_RootInsert_Notification_TypeArgs = {
  objects: Array<Notification_Type_Insert_Input>;
  on_conflict?: Maybe<Notification_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Notification_Type_OneArgs = {
  object: Notification_Type_Insert_Input;
  on_conflict?: Maybe<Notification_Type_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_NotificationsArgs = {
  objects: Array<Notifications_Insert_Input>;
  on_conflict?: Maybe<Notifications_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Notifications_OneArgs = {
  object: Notifications_Insert_Input;
  on_conflict?: Maybe<Notifications_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_AchievementArgs = {
  objects: Array<User_Achievement_Insert_Input>;
  on_conflict?: Maybe<User_Achievement_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Achievement_OneArgs = {
  object: User_Achievement_Insert_Input;
  on_conflict?: Maybe<User_Achievement_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
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
export type Mutation_RootUpdate_Challenge_Participant_StateArgs = {
  _set?: Maybe<Challenge_Participant_State_Set_Input>;
  where: Challenge_Participant_State_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Challenge_Participant_State_By_PkArgs = {
  _set?: Maybe<Challenge_Participant_State_Set_Input>;
  pk_columns: Challenge_Participant_State_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Challenge_StateArgs = {
  _set?: Maybe<Challenge_State_Set_Input>;
  where: Challenge_State_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Challenge_State_By_PkArgs = {
  _set?: Maybe<Challenge_State_Set_Input>;
  pk_columns: Challenge_State_Pk_Columns_Input;
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
export type Mutation_RootUpdate_FeedArgs = {
  _inc?: Maybe<Feed_Inc_Input>;
  _set?: Maybe<Feed_Set_Input>;
  where: Feed_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Feed_By_PkArgs = {
  _inc?: Maybe<Feed_Inc_Input>;
  _set?: Maybe<Feed_Set_Input>;
  pk_columns: Feed_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Feed_TypeArgs = {
  _set?: Maybe<Feed_Type_Set_Input>;
  where: Feed_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Feed_Type_By_PkArgs = {
  _set?: Maybe<Feed_Type_Set_Input>;
  pk_columns: Feed_Type_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Friend_TrackingArgs = {
  _inc?: Maybe<Friend_Tracking_Inc_Input>;
  _set?: Maybe<Friend_Tracking_Set_Input>;
  where: Friend_Tracking_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Friend_Tracking_By_PkArgs = {
  _inc?: Maybe<Friend_Tracking_Inc_Input>;
  _set?: Maybe<Friend_Tracking_Set_Input>;
  pk_columns: Friend_Tracking_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Notification_TypeArgs = {
  _set?: Maybe<Notification_Type_Set_Input>;
  where: Notification_Type_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Notification_Type_By_PkArgs = {
  _set?: Maybe<Notification_Type_Set_Input>;
  pk_columns: Notification_Type_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_NotificationsArgs = {
  _inc?: Maybe<Notifications_Inc_Input>;
  _set?: Maybe<Notifications_Set_Input>;
  where: Notifications_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Notifications_By_PkArgs = {
  _inc?: Maybe<Notifications_Inc_Input>;
  _set?: Maybe<Notifications_Set_Input>;
  pk_columns: Notifications_Pk_Columns_Input;
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

/** columns and relationships of "notification_type" */
export type Notification_Type = {
  __typename?: 'notification_type';
  title?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

/** aggregated selection of "notification_type" */
export type Notification_Type_Aggregate = {
  __typename?: 'notification_type_aggregate';
  aggregate?: Maybe<Notification_Type_Aggregate_Fields>;
  nodes: Array<Notification_Type>;
};

/** aggregate fields of "notification_type" */
export type Notification_Type_Aggregate_Fields = {
  __typename?: 'notification_type_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Notification_Type_Max_Fields>;
  min?: Maybe<Notification_Type_Min_Fields>;
};

/** aggregate fields of "notification_type" */
export type Notification_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Notification_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "notification_type" */
export type Notification_Type_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Notification_Type_Max_Order_By>;
  min?: Maybe<Notification_Type_Min_Order_By>;
};

/** input type for inserting array relation for remote table "notification_type" */
export type Notification_Type_Arr_Rel_Insert_Input = {
  data: Array<Notification_Type_Insert_Input>;
  on_conflict?: Maybe<Notification_Type_On_Conflict>;
};

/** Boolean expression to filter rows from the table "notification_type". All fields are combined with a logical 'AND'. */
export type Notification_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Notification_Type_Bool_Exp>>>;
  _not?: Maybe<Notification_Type_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Notification_Type_Bool_Exp>>>;
  title?: Maybe<String_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "notification_type" */
export enum Notification_Type_Constraint {
  /** unique or primary key constraint */
  NotificationTypePkey = 'notification_type_pkey',
}

export enum Notification_Type_Enum {
  /** Oh no... */
  ChallengeClosed = 'CHALLENGE_CLOSED',
  /** Oh no... */
  ChallengeExpired = 'CHALLENGE_EXPIRED',
  /** We have a winner ... */
  ChallengeFinished = 'CHALLENGE_FINISHED',
  /** You've been challenged! */
  ChallengeInvite = 'CHALLENGE_INVITE',
  /** Congratulation */
  ChallengeWon = 'CHALLENGE_WON',
  /** Congratulation */
  NewAchievement = 'NEW_ACHIEVEMENT',
  /** Someone responded to your challenge */
  ParticipantUpdate = 'PARTICIPANT_UPDATE',
  /** This notification is a test */
  TestNotification = 'TEST_NOTIFICATION',
}

/** expression to compare columns of type notification_type_enum. All fields are combined with logical 'AND'. */
export type Notification_Type_Enum_Comparison_Exp = {
  _eq?: Maybe<Notification_Type_Enum>;
  _in?: Maybe<Array<Notification_Type_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Notification_Type_Enum>;
  _nin?: Maybe<Array<Notification_Type_Enum>>;
};

/** input type for inserting data into table "notification_type" */
export type Notification_Type_Insert_Input = {
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Notification_Type_Max_Fields = {
  __typename?: 'notification_type_max_fields';
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "notification_type" */
export type Notification_Type_Max_Order_By = {
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Notification_Type_Min_Fields = {
  __typename?: 'notification_type_min_fields';
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "notification_type" */
export type Notification_Type_Min_Order_By = {
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** response of any mutation on the table "notification_type" */
export type Notification_Type_Mutation_Response = {
  __typename?: 'notification_type_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Notification_Type>;
};

/** input type for inserting object relation for remote table "notification_type" */
export type Notification_Type_Obj_Rel_Insert_Input = {
  data: Notification_Type_Insert_Input;
  on_conflict?: Maybe<Notification_Type_On_Conflict>;
};

/** on conflict condition type for table "notification_type" */
export type Notification_Type_On_Conflict = {
  constraint: Notification_Type_Constraint;
  update_columns: Array<Notification_Type_Update_Column>;
  where?: Maybe<Notification_Type_Bool_Exp>;
};

/** ordering options when selecting data from "notification_type" */
export type Notification_Type_Order_By = {
  title?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** primary key columns input for table: "notification_type" */
export type Notification_Type_Pk_Columns_Input = {
  type: Scalars['String'];
};

/** select columns of table "notification_type" */
export enum Notification_Type_Select_Column {
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "notification_type" */
export type Notification_Type_Set_Input = {
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** update columns of table "notification_type" */
export enum Notification_Type_Update_Column {
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
}

/** columns and relationships of "notifications" */
export type Notifications = {
  __typename?: 'notifications';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An object relationship */
  notification_type: Notification_Type;
  seen: Scalars['Boolean'];
  text: Scalars['String'];
  type: Notification_Type_Enum;
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "notifications" */
export type Notifications_Aggregate = {
  __typename?: 'notifications_aggregate';
  aggregate?: Maybe<Notifications_Aggregate_Fields>;
  nodes: Array<Notifications>;
};

/** aggregate fields of "notifications" */
export type Notifications_Aggregate_Fields = {
  __typename?: 'notifications_aggregate_fields';
  avg?: Maybe<Notifications_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Notifications_Max_Fields>;
  min?: Maybe<Notifications_Min_Fields>;
  stddev?: Maybe<Notifications_Stddev_Fields>;
  stddev_pop?: Maybe<Notifications_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Notifications_Stddev_Samp_Fields>;
  sum?: Maybe<Notifications_Sum_Fields>;
  var_pop?: Maybe<Notifications_Var_Pop_Fields>;
  var_samp?: Maybe<Notifications_Var_Samp_Fields>;
  variance?: Maybe<Notifications_Variance_Fields>;
};

/** aggregate fields of "notifications" */
export type Notifications_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Notifications_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "notifications" */
export type Notifications_Aggregate_Order_By = {
  avg?: Maybe<Notifications_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Notifications_Max_Order_By>;
  min?: Maybe<Notifications_Min_Order_By>;
  stddev?: Maybe<Notifications_Stddev_Order_By>;
  stddev_pop?: Maybe<Notifications_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Notifications_Stddev_Samp_Order_By>;
  sum?: Maybe<Notifications_Sum_Order_By>;
  var_pop?: Maybe<Notifications_Var_Pop_Order_By>;
  var_samp?: Maybe<Notifications_Var_Samp_Order_By>;
  variance?: Maybe<Notifications_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "notifications" */
export type Notifications_Arr_Rel_Insert_Input = {
  data: Array<Notifications_Insert_Input>;
  on_conflict?: Maybe<Notifications_On_Conflict>;
};

/** aggregate avg on columns */
export type Notifications_Avg_Fields = {
  __typename?: 'notifications_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "notifications" */
export type Notifications_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "notifications". All fields are combined with a logical 'AND'. */
export type Notifications_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Notifications_Bool_Exp>>>;
  _not?: Maybe<Notifications_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Notifications_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  notification_type?: Maybe<Notification_Type_Bool_Exp>;
  seen?: Maybe<Boolean_Comparison_Exp>;
  text?: Maybe<String_Comparison_Exp>;
  type?: Maybe<Notification_Type_Enum_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "notifications" */
export enum Notifications_Constraint {
  /** unique or primary key constraint */
  NotificationsPkey = 'notifications_pkey',
}

/** input type for incrementing integer column in table "notifications" */
export type Notifications_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "notifications" */
export type Notifications_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  notification_type?: Maybe<Notification_Type_Obj_Rel_Insert_Input>;
  seen?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Notification_Type_Enum>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Notifications_Max_Fields = {
  __typename?: 'notifications_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "notifications" */
export type Notifications_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Notifications_Min_Fields = {
  __typename?: 'notifications_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "notifications" */
export type Notifications_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "notifications" */
export type Notifications_Mutation_Response = {
  __typename?: 'notifications_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Notifications>;
};

/** input type for inserting object relation for remote table "notifications" */
export type Notifications_Obj_Rel_Insert_Input = {
  data: Notifications_Insert_Input;
  on_conflict?: Maybe<Notifications_On_Conflict>;
};

/** on conflict condition type for table "notifications" */
export type Notifications_On_Conflict = {
  constraint: Notifications_Constraint;
  update_columns: Array<Notifications_Update_Column>;
  where?: Maybe<Notifications_Bool_Exp>;
};

/** ordering options when selecting data from "notifications" */
export type Notifications_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  notification_type?: Maybe<Notification_Type_Order_By>;
  seen?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "notifications" */
export type Notifications_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "notifications" */
export enum Notifications_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Seen = 'seen',
  /** column name */
  Text = 'text',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "notifications" */
export type Notifications_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  seen?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Notification_Type_Enum>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Notifications_Stddev_Fields = {
  __typename?: 'notifications_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "notifications" */
export type Notifications_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Notifications_Stddev_Pop_Fields = {
  __typename?: 'notifications_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "notifications" */
export type Notifications_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Notifications_Stddev_Samp_Fields = {
  __typename?: 'notifications_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "notifications" */
export type Notifications_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Notifications_Sum_Fields = {
  __typename?: 'notifications_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "notifications" */
export type Notifications_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "notifications" */
export enum Notifications_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Seen = 'seen',
  /** column name */
  Text = 'text',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Notifications_Var_Pop_Fields = {
  __typename?: 'notifications_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "notifications" */
export type Notifications_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Notifications_Var_Samp_Fields = {
  __typename?: 'notifications_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "notifications" */
export type Notifications_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Notifications_Variance_Fields = {
  __typename?: 'notifications_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "notifications" */
export type Notifications_Variance_Order_By = {
  id?: Maybe<Order_By>;
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
  /** fetch data from the table: "achievement" */
  achievement: Array<Achievement>;
  /** fetch aggregated fields from the table: "achievement" */
  achievement_aggregate: Achievement_Aggregate;
  /** fetch data from the table: "achievement" using primary key columns */
  achievement_by_pk?: Maybe<Achievement>;
  /** fetch data from the table: "achievement_type" */
  achievement_type: Array<Achievement_Type>;
  /** fetch aggregated fields from the table: "achievement_type" */
  achievement_type_aggregate: Achievement_Type_Aggregate;
  /** fetch data from the table: "achievement_type" using primary key columns */
  achievement_type_by_pk?: Maybe<Achievement_Type>;
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
  /** fetch data from the table: "challenge" */
  challenge: Array<Challenge>;
  /** fetch aggregated fields from the table: "challenge" */
  challenge_aggregate: Challenge_Aggregate;
  /** fetch data from the table: "challenge" using primary key columns */
  challenge_by_pk?: Maybe<Challenge>;
  /** fetch data from the table: "challenge_participant" */
  challenge_participant: Array<Challenge_Participant>;
  /** fetch aggregated fields from the table: "challenge_participant" */
  challenge_participant_aggregate: Challenge_Participant_Aggregate;
  /** fetch data from the table: "challenge_participant" using primary key columns */
  challenge_participant_by_pk?: Maybe<Challenge_Participant>;
  /** fetch data from the table: "challenge_participant_state" */
  challenge_participant_state: Array<Challenge_Participant_State>;
  /** fetch aggregated fields from the table: "challenge_participant_state" */
  challenge_participant_state_aggregate: Challenge_Participant_State_Aggregate;
  /** fetch data from the table: "challenge_participant_state" using primary key columns */
  challenge_participant_state_by_pk?: Maybe<Challenge_Participant_State>;
  /** fetch data from the table: "challenge_state" */
  challenge_state: Array<Challenge_State>;
  /** fetch aggregated fields from the table: "challenge_state" */
  challenge_state_aggregate: Challenge_State_Aggregate;
  /** fetch data from the table: "challenge_state" using primary key columns */
  challenge_state_by_pk?: Maybe<Challenge_State>;
  /** fetch data from the table: "challenge_type" */
  challenge_type: Array<Challenge_Type>;
  /** fetch aggregated fields from the table: "challenge_type" */
  challenge_type_aggregate: Challenge_Type_Aggregate;
  /** fetch data from the table: "challenge_type" using primary key columns */
  challenge_type_by_pk?: Maybe<Challenge_Type>;
  /** fetch data from the table: "comments" using primary key columns */
  comment?: Maybe<Comments>;
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "feed" */
  feed: Array<Feed>;
  /** fetch aggregated fields from the table: "feed" */
  feed_aggregate: Feed_Aggregate;
  /** fetch data from the table: "feed" using primary key columns */
  feed_by_pk?: Maybe<Feed>;
  /** fetch data from the table: "feed_type" */
  feed_type: Array<Feed_Type>;
  /** fetch aggregated fields from the table: "feed_type" */
  feed_type_aggregate: Feed_Type_Aggregate;
  /** fetch data from the table: "feed_type" using primary key columns */
  feed_type_by_pk?: Maybe<Feed_Type>;
  /** fetch data from the table: "followings" */
  followings: Array<Followings>;
  /** fetch aggregated fields from the table: "followings" */
  followings_aggregate: Followings_Aggregate;
  /** fetch data from the table: "followings" using primary key columns */
  followings_by_pk?: Maybe<Followings>;
  /** fetch data from the table: "friend_tracking" */
  friend_tracking: Array<Friend_Tracking>;
  /** fetch aggregated fields from the table: "friend_tracking" */
  friend_tracking_aggregate: Friend_Tracking_Aggregate;
  /** fetch data from the table: "friend_tracking" using primary key columns */
  friend_tracking_by_pk?: Maybe<Friend_Tracking>;
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
  /** fetch data from the table: "notification_type" */
  notification_type: Array<Notification_Type>;
  /** fetch aggregated fields from the table: "notification_type" */
  notification_type_aggregate: Notification_Type_Aggregate;
  /** fetch data from the table: "notification_type" using primary key columns */
  notification_type_by_pk?: Maybe<Notification_Type>;
  /** fetch data from the table: "notifications" */
  notifications: Array<Notifications>;
  /** fetch aggregated fields from the table: "notifications" */
  notifications_aggregate: Notifications_Aggregate;
  /** fetch data from the table: "notifications" using primary key columns */
  notifications_by_pk?: Maybe<Notifications>;
  /** execute function "unachievedachievements" which returns "achievement" */
  unachievedachievements: Array<Achievement>;
  /** execute function "unachievedachievements" and query aggregates on result of table type "achievement" */
  unachievedachievements_aggregate: Achievement_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch data from the table: "user_achievement" */
  user_achievement: Array<User_Achievement>;
  /** fetch aggregated fields from the table: "user_achievement" */
  user_achievement_aggregate: User_Achievement_Aggregate;
  /** fetch data from the table: "user_achievement" using primary key columns */
  user_achievement_by_pk?: Maybe<User_Achievement>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
};

/** query root */
export type Query_RootAchievementArgs = {
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootAchievement_AggregateArgs = {
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootAchievement_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootAchievement_TypeArgs = {
  distinct_on?: Maybe<Array<Achievement_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Type_Order_By>>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** query root */
export type Query_RootAchievement_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Achievement_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Type_Order_By>>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** query root */
export type Query_RootAchievement_Type_By_PkArgs = {
  name: Scalars['String'];
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
export type Query_RootChallengeArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootChallenge_ParticipantArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Participant_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Participant_By_PkArgs = {
  challenge_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** query root */
export type Query_RootChallenge_Participant_StateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_State_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_State_Order_By>>;
  where?: Maybe<Challenge_Participant_State_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Participant_State_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_State_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_State_Order_By>>;
  where?: Maybe<Challenge_Participant_State_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Participant_State_By_PkArgs = {
  state: Scalars['String'];
};

/** query root */
export type Query_RootChallenge_StateArgs = {
  distinct_on?: Maybe<Array<Challenge_State_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_State_Order_By>>;
  where?: Maybe<Challenge_State_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_State_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_State_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_State_Order_By>>;
  where?: Maybe<Challenge_State_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_State_By_PkArgs = {
  state: Scalars['String'];
};

/** query root */
export type Query_RootChallenge_TypeArgs = {
  distinct_on?: Maybe<Array<Challenge_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Type_Order_By>>;
  where?: Maybe<Challenge_Type_Bool_Exp>;
};

/** query root */
export type Query_RootChallenge_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Type_Order_By>>;
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
export type Query_RootFeedArgs = {
  distinct_on?: Maybe<Array<Feed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Order_By>>;
  where?: Maybe<Feed_Bool_Exp>;
};

/** query root */
export type Query_RootFeed_AggregateArgs = {
  distinct_on?: Maybe<Array<Feed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Order_By>>;
  where?: Maybe<Feed_Bool_Exp>;
};

/** query root */
export type Query_RootFeed_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootFeed_TypeArgs = {
  distinct_on?: Maybe<Array<Feed_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Type_Order_By>>;
  where?: Maybe<Feed_Type_Bool_Exp>;
};

/** query root */
export type Query_RootFeed_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Feed_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Type_Order_By>>;
  where?: Maybe<Feed_Type_Bool_Exp>;
};

/** query root */
export type Query_RootFeed_Type_By_PkArgs = {
  name: Scalars['String'];
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
export type Query_RootFriend_TrackingArgs = {
  distinct_on?: Maybe<Array<Friend_Tracking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friend_Tracking_Order_By>>;
  where?: Maybe<Friend_Tracking_Bool_Exp>;
};

/** query root */
export type Query_RootFriend_Tracking_AggregateArgs = {
  distinct_on?: Maybe<Array<Friend_Tracking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friend_Tracking_Order_By>>;
  where?: Maybe<Friend_Tracking_Bool_Exp>;
};

/** query root */
export type Query_RootFriend_Tracking_By_PkArgs = {
  id: Scalars['Int'];
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
  feed_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** query root */
export type Query_RootNotification_TypeArgs = {
  distinct_on?: Maybe<Array<Notification_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notification_Type_Order_By>>;
  where?: Maybe<Notification_Type_Bool_Exp>;
};

/** query root */
export type Query_RootNotification_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Notification_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notification_Type_Order_By>>;
  where?: Maybe<Notification_Type_Bool_Exp>;
};

/** query root */
export type Query_RootNotification_Type_By_PkArgs = {
  type: Scalars['String'];
};

/** query root */
export type Query_RootNotificationsArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};

/** query root */
export type Query_RootNotifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};

/** query root */
export type Query_RootNotifications_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootUnachievedachievementsArgs = {
  args: Unachievedachievements_Args;
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootUnachievedachievements_AggregateArgs = {
  args: Unachievedachievements_Args;
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootUserArgs = {
  id: Scalars['String'];
};

/** query root */
export type Query_RootUser_AchievementArgs = {
  distinct_on?: Maybe<Array<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Achievement_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Achievement_By_PkArgs = {
  achievement_id: Scalars['Int'];
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

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "achievement" */
  achievement: Array<Achievement>;
  /** fetch aggregated fields from the table: "achievement" */
  achievement_aggregate: Achievement_Aggregate;
  /** fetch data from the table: "achievement" using primary key columns */
  achievement_by_pk?: Maybe<Achievement>;
  /** fetch data from the table: "achievement_type" */
  achievement_type: Array<Achievement_Type>;
  /** fetch aggregated fields from the table: "achievement_type" */
  achievement_type_aggregate: Achievement_Type_Aggregate;
  /** fetch data from the table: "achievement_type" using primary key columns */
  achievement_type_by_pk?: Maybe<Achievement_Type>;
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
  /** fetch data from the table: "challenge" */
  challenge: Array<Challenge>;
  /** fetch aggregated fields from the table: "challenge" */
  challenge_aggregate: Challenge_Aggregate;
  /** fetch data from the table: "challenge" using primary key columns */
  challenge_by_pk?: Maybe<Challenge>;
  /** fetch data from the table: "challenge_participant" */
  challenge_participant: Array<Challenge_Participant>;
  /** fetch aggregated fields from the table: "challenge_participant" */
  challenge_participant_aggregate: Challenge_Participant_Aggregate;
  /** fetch data from the table: "challenge_participant" using primary key columns */
  challenge_participant_by_pk?: Maybe<Challenge_Participant>;
  /** fetch data from the table: "challenge_participant_state" */
  challenge_participant_state: Array<Challenge_Participant_State>;
  /** fetch aggregated fields from the table: "challenge_participant_state" */
  challenge_participant_state_aggregate: Challenge_Participant_State_Aggregate;
  /** fetch data from the table: "challenge_participant_state" using primary key columns */
  challenge_participant_state_by_pk?: Maybe<Challenge_Participant_State>;
  /** fetch data from the table: "challenge_state" */
  challenge_state: Array<Challenge_State>;
  /** fetch aggregated fields from the table: "challenge_state" */
  challenge_state_aggregate: Challenge_State_Aggregate;
  /** fetch data from the table: "challenge_state" using primary key columns */
  challenge_state_by_pk?: Maybe<Challenge_State>;
  /** fetch data from the table: "challenge_type" */
  challenge_type: Array<Challenge_Type>;
  /** fetch aggregated fields from the table: "challenge_type" */
  challenge_type_aggregate: Challenge_Type_Aggregate;
  /** fetch data from the table: "challenge_type" using primary key columns */
  challenge_type_by_pk?: Maybe<Challenge_Type>;
  /** fetch data from the table: "comments" using primary key columns */
  comment?: Maybe<Comments>;
  /** fetch data from the table: "comments" */
  comments: Array<Comments>;
  /** fetch aggregated fields from the table: "comments" */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "feed" */
  feed: Array<Feed>;
  /** fetch aggregated fields from the table: "feed" */
  feed_aggregate: Feed_Aggregate;
  /** fetch data from the table: "feed" using primary key columns */
  feed_by_pk?: Maybe<Feed>;
  /** fetch data from the table: "feed_type" */
  feed_type: Array<Feed_Type>;
  /** fetch aggregated fields from the table: "feed_type" */
  feed_type_aggregate: Feed_Type_Aggregate;
  /** fetch data from the table: "feed_type" using primary key columns */
  feed_type_by_pk?: Maybe<Feed_Type>;
  /** fetch data from the table: "followings" */
  followings: Array<Followings>;
  /** fetch aggregated fields from the table: "followings" */
  followings_aggregate: Followings_Aggregate;
  /** fetch data from the table: "followings" using primary key columns */
  followings_by_pk?: Maybe<Followings>;
  /** fetch data from the table: "friend_tracking" */
  friend_tracking: Array<Friend_Tracking>;
  /** fetch aggregated fields from the table: "friend_tracking" */
  friend_tracking_aggregate: Friend_Tracking_Aggregate;
  /** fetch data from the table: "friend_tracking" using primary key columns */
  friend_tracking_by_pk?: Maybe<Friend_Tracking>;
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
  /** fetch data from the table: "notification_type" */
  notification_type: Array<Notification_Type>;
  /** fetch aggregated fields from the table: "notification_type" */
  notification_type_aggregate: Notification_Type_Aggregate;
  /** fetch data from the table: "notification_type" using primary key columns */
  notification_type_by_pk?: Maybe<Notification_Type>;
  /** fetch data from the table: "notifications" */
  notifications: Array<Notifications>;
  /** fetch aggregated fields from the table: "notifications" */
  notifications_aggregate: Notifications_Aggregate;
  /** fetch data from the table: "notifications" using primary key columns */
  notifications_by_pk?: Maybe<Notifications>;
  /** execute function "unachievedachievements" which returns "achievement" */
  unachievedachievements: Array<Achievement>;
  /** execute function "unachievedachievements" and query aggregates on result of table type "achievement" */
  unachievedachievements_aggregate: Achievement_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  user?: Maybe<Users>;
  /** fetch data from the table: "user_achievement" */
  user_achievement: Array<User_Achievement>;
  /** fetch aggregated fields from the table: "user_achievement" */
  user_achievement_aggregate: User_Achievement_Aggregate;
  /** fetch data from the table: "user_achievement" using primary key columns */
  user_achievement_by_pk?: Maybe<User_Achievement>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
};

/** subscription root */
export type Subscription_RootAchievementArgs = {
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAchievement_AggregateArgs = {
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAchievement_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootAchievement_TypeArgs = {
  distinct_on?: Maybe<Array<Achievement_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Type_Order_By>>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAchievement_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Achievement_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Type_Order_By>>;
  where?: Maybe<Achievement_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAchievement_Type_By_PkArgs = {
  name: Scalars['String'];
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
export type Subscription_RootChallengeArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootChallenge_ParticipantArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Participant_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Participant_By_PkArgs = {
  challenge_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootChallenge_Participant_StateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_State_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_State_Order_By>>;
  where?: Maybe<Challenge_Participant_State_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Participant_State_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_State_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_State_Order_By>>;
  where?: Maybe<Challenge_Participant_State_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Participant_State_By_PkArgs = {
  state: Scalars['String'];
};

/** subscription root */
export type Subscription_RootChallenge_StateArgs = {
  distinct_on?: Maybe<Array<Challenge_State_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_State_Order_By>>;
  where?: Maybe<Challenge_State_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_State_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_State_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_State_Order_By>>;
  where?: Maybe<Challenge_State_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_State_By_PkArgs = {
  state: Scalars['String'];
};

/** subscription root */
export type Subscription_RootChallenge_TypeArgs = {
  distinct_on?: Maybe<Array<Challenge_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Type_Order_By>>;
  where?: Maybe<Challenge_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootChallenge_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Type_Order_By>>;
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
export type Subscription_RootFeedArgs = {
  distinct_on?: Maybe<Array<Feed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Order_By>>;
  where?: Maybe<Feed_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFeed_AggregateArgs = {
  distinct_on?: Maybe<Array<Feed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Order_By>>;
  where?: Maybe<Feed_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFeed_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootFeed_TypeArgs = {
  distinct_on?: Maybe<Array<Feed_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Type_Order_By>>;
  where?: Maybe<Feed_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFeed_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Feed_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Feed_Type_Order_By>>;
  where?: Maybe<Feed_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFeed_Type_By_PkArgs = {
  name: Scalars['String'];
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
export type Subscription_RootFriend_TrackingArgs = {
  distinct_on?: Maybe<Array<Friend_Tracking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friend_Tracking_Order_By>>;
  where?: Maybe<Friend_Tracking_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFriend_Tracking_AggregateArgs = {
  distinct_on?: Maybe<Array<Friend_Tracking_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Friend_Tracking_Order_By>>;
  where?: Maybe<Friend_Tracking_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootFriend_Tracking_By_PkArgs = {
  id: Scalars['Int'];
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
  feed_id: Scalars['Int'];
  user_id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootNotification_TypeArgs = {
  distinct_on?: Maybe<Array<Notification_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notification_Type_Order_By>>;
  where?: Maybe<Notification_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootNotification_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Notification_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notification_Type_Order_By>>;
  where?: Maybe<Notification_Type_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootNotification_Type_By_PkArgs = {
  type: Scalars['String'];
};

/** subscription root */
export type Subscription_RootNotificationsArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootNotifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootNotifications_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootUnachievedachievementsArgs = {
  args: Unachievedachievements_Args;
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUnachievedachievements_AggregateArgs = {
  args: Unachievedachievements_Args;
  distinct_on?: Maybe<Array<Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Achievement_Order_By>>;
  where?: Maybe<Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUserArgs = {
  id: Scalars['String'];
};

/** subscription root */
export type Subscription_RootUser_AchievementArgs = {
  distinct_on?: Maybe<Array<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Achievement_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Achievement_By_PkArgs = {
  achievement_id: Scalars['Int'];
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

export type Unachievedachievements_Args = {
  uid?: Maybe<Scalars['String']>;
};

/** columns and relationships of "user_achievement" */
export type User_Achievement = {
  __typename?: 'user_achievement';
  /** An object relationship */
  achievement: Achievement;
  achievement_id: Scalars['Int'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "user_achievement" */
export type User_Achievement_Aggregate = {
  __typename?: 'user_achievement_aggregate';
  aggregate?: Maybe<User_Achievement_Aggregate_Fields>;
  nodes: Array<User_Achievement>;
};

/** aggregate fields of "user_achievement" */
export type User_Achievement_Aggregate_Fields = {
  __typename?: 'user_achievement_aggregate_fields';
  avg?: Maybe<User_Achievement_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Achievement_Max_Fields>;
  min?: Maybe<User_Achievement_Min_Fields>;
  stddev?: Maybe<User_Achievement_Stddev_Fields>;
  stddev_pop?: Maybe<User_Achievement_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Achievement_Stddev_Samp_Fields>;
  sum?: Maybe<User_Achievement_Sum_Fields>;
  var_pop?: Maybe<User_Achievement_Var_Pop_Fields>;
  var_samp?: Maybe<User_Achievement_Var_Samp_Fields>;
  variance?: Maybe<User_Achievement_Variance_Fields>;
};

/** aggregate fields of "user_achievement" */
export type User_Achievement_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Achievement_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_achievement" */
export type User_Achievement_Aggregate_Order_By = {
  avg?: Maybe<User_Achievement_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Achievement_Max_Order_By>;
  min?: Maybe<User_Achievement_Min_Order_By>;
  stddev?: Maybe<User_Achievement_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Achievement_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Achievement_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Achievement_Sum_Order_By>;
  var_pop?: Maybe<User_Achievement_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Achievement_Var_Samp_Order_By>;
  variance?: Maybe<User_Achievement_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_achievement" */
export type User_Achievement_Arr_Rel_Insert_Input = {
  data: Array<User_Achievement_Insert_Input>;
  on_conflict?: Maybe<User_Achievement_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Achievement_Avg_Fields = {
  __typename?: 'user_achievement_avg_fields';
  achievement_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_achievement" */
export type User_Achievement_Avg_Order_By = {
  achievement_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_achievement". All fields are combined with a logical 'AND'. */
export type User_Achievement_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Achievement_Bool_Exp>>>;
  _not?: Maybe<User_Achievement_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Achievement_Bool_Exp>>>;
  achievement?: Maybe<Achievement_Bool_Exp>;
  achievement_id?: Maybe<Int_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_achievement" */
export enum User_Achievement_Constraint {
  /** unique or primary key constraint */
  UserAchievementPkey = 'user_achievement_pkey',
}

/** input type for incrementing integer column in table "user_achievement" */
export type User_Achievement_Inc_Input = {
  achievement_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_achievement" */
export type User_Achievement_Insert_Input = {
  achievement?: Maybe<Achievement_Obj_Rel_Insert_Input>;
  achievement_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Achievement_Max_Fields = {
  __typename?: 'user_achievement_max_fields';
  achievement_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_achievement" */
export type User_Achievement_Max_Order_By = {
  achievement_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Achievement_Min_Fields = {
  __typename?: 'user_achievement_min_fields';
  achievement_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_achievement" */
export type User_Achievement_Min_Order_By = {
  achievement_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_achievement" */
export type User_Achievement_Mutation_Response = {
  __typename?: 'user_achievement_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Achievement>;
};

/** input type for inserting object relation for remote table "user_achievement" */
export type User_Achievement_Obj_Rel_Insert_Input = {
  data: User_Achievement_Insert_Input;
  on_conflict?: Maybe<User_Achievement_On_Conflict>;
};

/** on conflict condition type for table "user_achievement" */
export type User_Achievement_On_Conflict = {
  constraint: User_Achievement_Constraint;
  update_columns: Array<User_Achievement_Update_Column>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** ordering options when selecting data from "user_achievement" */
export type User_Achievement_Order_By = {
  achievement?: Maybe<Achievement_Order_By>;
  achievement_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "user_achievement" */
export type User_Achievement_Pk_Columns_Input = {
  achievement_id: Scalars['Int'];
  user_id: Scalars['String'];
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
  achievement_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type User_Achievement_Stddev_Fields = {
  __typename?: 'user_achievement_stddev_fields';
  achievement_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_achievement" */
export type User_Achievement_Stddev_Order_By = {
  achievement_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Achievement_Stddev_Pop_Fields = {
  __typename?: 'user_achievement_stddev_pop_fields';
  achievement_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_achievement" */
export type User_Achievement_Stddev_Pop_Order_By = {
  achievement_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Achievement_Stddev_Samp_Fields = {
  __typename?: 'user_achievement_stddev_samp_fields';
  achievement_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_achievement" */
export type User_Achievement_Stddev_Samp_Order_By = {
  achievement_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Achievement_Sum_Fields = {
  __typename?: 'user_achievement_sum_fields';
  achievement_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_achievement" */
export type User_Achievement_Sum_Order_By = {
  achievement_id?: Maybe<Order_By>;
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
  __typename?: 'user_achievement_var_pop_fields';
  achievement_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_achievement" */
export type User_Achievement_Var_Pop_Order_By = {
  achievement_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Achievement_Var_Samp_Fields = {
  __typename?: 'user_achievement_var_samp_fields';
  achievement_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_achievement" */
export type User_Achievement_Var_Samp_Order_By = {
  achievement_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Achievement_Variance_Fields = {
  __typename?: 'user_achievement_variance_fields';
  achievement_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_achievement" */
export type User_Achievement_Variance_Order_By = {
  achievement_id?: Maybe<Order_By>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  activities: Array<Activities>;
  /** An aggregated array relationship */
  activities_aggregate: Activities_Aggregate;
  bio?: Maybe<Scalars['String']>;
  /** An array relationship */
  challenge_participants: Array<Challenge_Participant>;
  /** An aggregated array relationship */
  challenge_participants_aggregate: Challenge_Participant_Aggregate;
  /** An array relationship */
  challenges_won: Array<Challenge>;
  /** An aggregated array relationship */
  challenges_won_aggregate: Challenge_Aggregate;
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
  name: Scalars['String'];
  /** An array relationship */
  notifications: Array<Notifications>;
  /** An aggregated array relationship */
  notifications_aggregate: Notifications_Aggregate;
  picture?: Maybe<Scalars['String']>;
  push_token?: Maybe<Scalars['String']>;
  /** A computed field, executes function "totalscore" */
  totalScore?: Maybe<Scalars['bigint']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  user_achievement: Array<User_Achievement>;
  /** An aggregated array relationship */
  user_achievement_aggregate: User_Achievement_Aggregate;
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
export type UsersChallenge_ParticipantsArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersChallenge_Participants_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Participant_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Participant_Order_By>>;
  where?: Maybe<Challenge_Participant_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersChallenges_WonArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersChallenges_Won_AggregateArgs = {
  distinct_on?: Maybe<Array<Challenge_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Challenge_Order_By>>;
  where?: Maybe<Challenge_Bool_Exp>;
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

/** columns and relationships of "users" */
export type UsersNotificationsArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersNotifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notifications_Order_By>>;
  where?: Maybe<Notifications_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersUser_AchievementArgs = {
  distinct_on?: Maybe<Array<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
};

/** columns and relationships of "users" */
export type UsersUser_Achievement_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Achievement_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Achievement_Order_By>>;
  where?: Maybe<User_Achievement_Bool_Exp>;
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
  challenge_participants?: Maybe<Challenge_Participant_Bool_Exp>;
  challenges_won?: Maybe<Challenge_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  followers?: Maybe<Followings_Bool_Exp>;
  following?: Maybe<Followings_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  notifications?: Maybe<Notifications_Bool_Exp>;
  picture?: Maybe<String_Comparison_Exp>;
  push_token?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user_achievement?: Maybe<User_Achievement_Bool_Exp>;
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
  challenge_participants?: Maybe<Challenge_Participant_Arr_Rel_Insert_Input>;
  challenges_won?: Maybe<Challenge_Arr_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  followers?: Maybe<Followings_Arr_Rel_Insert_Input>;
  following?: Maybe<Followings_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notifications?: Maybe<Notifications_Arr_Rel_Insert_Input>;
  picture?: Maybe<Scalars['String']>;
  push_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_achievement?: Maybe<User_Achievement_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  bio?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  push_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
  push_token?: Maybe<Order_By>;
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
  picture?: Maybe<Scalars['String']>;
  push_token?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  bio?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture?: Maybe<Order_By>;
  push_token?: Maybe<Order_By>;
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
  challenge_participants_aggregate?: Maybe<Challenge_Participant_Aggregate_Order_By>;
  challenges_won_aggregate?: Maybe<Challenge_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  followers_aggregate?: Maybe<Followings_Aggregate_Order_By>;
  following_aggregate?: Maybe<Followings_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  notifications_aggregate?: Maybe<Notifications_Aggregate_Order_By>;
  picture?: Maybe<Order_By>;
  push_token?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_achievement_aggregate?: Maybe<User_Achievement_Aggregate_Order_By>;
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
  Picture = 'picture',
  /** column name */
  PushToken = 'push_token',
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
  picture?: Maybe<Scalars['String']>;
  push_token?: Maybe<Scalars['String']>;
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
  Picture = 'picture',
  /** column name */
  PushToken = 'push_token',
  /** column name */
  UpdatedAt = 'updated_at',
}
