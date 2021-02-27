import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListUserFragmentFragment } from '../../graphql/Fragments.generated';
import { Typography, Spacing } from '../../theme';
import { Avatar } from 'react-native-elements';
import { defaultUserProfile } from '../../helpers/objectMappers';
interface OpponentsListProps {
  opponents: ListUserFragmentFragment[];
}

const OpponentsRowList: React.FC<OpponentsListProps> = ({ opponents }: OpponentsListProps) => {
  return (
    <View style={styles.opponentRow}>
      {opponents.map((opponent: ListUserFragmentFragment) => (
        <View key={opponent.id} style={styles.opponentBox}>
          <Avatar source={{ uri: opponent.picture ?? defaultUserProfile.picture }} size="small" />
          <Text style={styles.opponentNameText}>{opponent.name.split(' ')[0]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  opponentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '75%',
    flexWrap: 'wrap',
  },
  opponentBox: {
    alignItems: 'center',
    marginLeft: Spacing.base,
    marginTop: Spacing.smallest,
  },
  opponentNameText: {
    ...Typography.bodyText,
    fontSize: 12,
  },
});

export default OpponentsRowList;
