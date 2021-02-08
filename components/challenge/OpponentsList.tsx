import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ListUserFragmentFragment } from '../../graphql/Fragments.generated';
import { Colors, Typography, Spacing, Buttons } from '../../theme';
interface OpponentsListProps {
  opponents: ListUserFragmentFragment[];
}

const OpponentsList: React.FC<OpponentsListProps> = ({ opponents }: OpponentsListProps) => {
  return (
    <View>
      {opponents.map((opponent: ListUserFragmentFragment) => (
        <View key={opponent.id} style={styles.opponentRow}>
          <Image source={{ uri: opponent.picture ?? '' }} style={styles.opponentAvatar} />
          <View style={styles.oppnentNameStateRow}>
            <Text style={styles.opponentNameText}>{opponent.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  topBarAvatar: {
    width: '20%',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: Spacing.small,
  },
  topBarText: {
    width: '80%',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 30,
  },
  descriptionText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontStyle: 'italic',
  },
  opponentContainer: {
    paddingTop: Spacing.base,
    justifyContent: 'flex-end',
    width: '100%',
    left: '20%',
  },
  opponentHeaderText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: Spacing.base,
  },
  opponentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  opponentAvatar: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    marginRight: Spacing.small,
  },
  oppnentNameStateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  opponentNameText: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    width: '60%',
  },
  opponentStateText: {
    ...Typography.bodyText,
    fontSize: 10,
    fontStyle: 'italic',
    width: '40%',
  },
  stateUpdateMessage: {
    marginVertical: Spacing.base,
    ...Typography.bodyText,
    fontStyle: 'italic',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  acceptButton: {
    width: '45%',
    ...Buttons.button,
    backgroundColor: Colors.blue,
    marginVertical: Spacing.base,
  },
  declineButton: {
    width: '45%',
    ...Buttons.button,
    backgroundColor: Colors.gray100,
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});

export default OpponentsList;
