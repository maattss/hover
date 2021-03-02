import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../../theme';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';

type FooterProps = {
  createdAt: string;
};

const Footer: React.FC<FooterProps> = ({ createdAt }: FooterProps) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{timeStampToPresentable(createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: Spacing.smallest,
    width: '100%',
  },
  footerText: {
    color: Colors.almostWhite,
    fontStyle: 'italic',
    fontSize: 14,
  },
});

export default Footer;
