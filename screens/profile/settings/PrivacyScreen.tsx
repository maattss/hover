import React from 'react';
import { StyleSheet, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';

const PrivacyScreen: React.FC<SettingsProps> = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.bodyText}>
        Mats Tyldum and Siri Mykland built the Hover app as a Free app. This service is provided by Mats Tyldum and Siri
        Mykland at no cost and is intended for use as is. This page is used to inform visitors regarding our policies
        with the collection, use, and disclosure of Personal Information if anyone decided to use our Service. If you
        choose to use our Service, then you agree to the collection and use of information in relation to this policy.
        The Personal Information that we collect is used for providing and improving the Service. will not use or share
        your information with anyone except as described in this Privacy Policy. The terms used in this Privacy Policy
        have the same meanings as in our Terms and Conditions, which is accessible at Hover unless otherwise defined in
        this Privacy Policy.
      </Text>
      <Text style={styles.subHeaderText}>Information Collection and Use</Text>
      <Text style={styles.bodyText}>
        For a better experience, while using our Service, we may require you to provide us with certain personally
        identifiable information. The information that we request will be retained on your device and is not collected
        by us in any way.
      </Text>
      <Text style={styles.subHeaderText}>Account, Profile and Activity</Text>
      <Text style={styles.bodyText}>
        Activity and use information is collected about you when you choose to upload an activity (including date, time
        and geofence-location information). We use your contact information so we can respond to your support requests
        and comments.
      </Text>
      <Text style={styles.subHeaderText}>Location Information</Text>
      <Text style={styles.bodyText}>
        We collect and process location information when you sign up for and use the Services. We do not track your
        device location while you are not using Hover, but in order to provide Hovers&apos; core service, it is
        necessary for us to track your device location while you use Hover. You may at any time adjusting your device
        settings if you would like to stop the device location tracking.
      </Text>
      <Text style={styles.subHeaderText}>Content You Share</Text>
      <Text style={styles.bodyText}>
        We gather information from the activities and reactions you share on the Service, including when you create or
        participate in challenges.
      </Text>
      <Text style={styles.subHeaderText}>Log Data</Text>
      <Text style={styles.bodyText}>
        We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and
        information (through third party products) on your phone called Log Data. This Log Data may include information
        such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration
        of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
      </Text>
      <Text style={styles.subHeaderText}>Cookies</Text>
      <Text style={styles.bodyText}>
        Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are
        sent to your browser from the websites that you visit and are stored on your device&apos;s internal memory. This
        Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that
        use “cookies” to collect information and improve their services. You have the option to either accept or refuse
        these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may
        not be able to use some portions of this Service.
      </Text>
      <Text style={styles.subHeaderText}>Service Providers</Text>
      <Text style={styles.bodyText}>
        We may employ third-party companies and individuals due to the following reasons: To facilitate our Service; To
        provide the Service on our behalf; To perform Service-related services; or To assist us in analyzing how our
        Service is used. We want to inform users of this Service that these third parties have access to your Personal
        Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not
        to disclose or use the information for any other purpose.
      </Text>
      <Text style={styles.subHeaderText}>Security</Text>
      <Text style={styles.bodyText}>
        We value your trust in providing us your Personal Information, thus we are striving to use commercially
        acceptable means of protecting it. But remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
      </Text>
      <Text style={styles.subHeaderText}>Links to Other Sites</Text>
      <Text style={styles.bodyText}>
        This Service may contain links to other sites. If you click on a third-party link, you will be directed to that
        site. Note that these external sites are not operated by me. Therefore, we strongly advise you to review the
        Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy
        policies, or practices of any third-party sites or services.
      </Text>
      <Text style={styles.subHeaderText}>Children’s Privacy</Text>
      <Text style={styles.bodyText}>
        These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable
        information from children under 13 years of age. In the case we discover that a child under 13 has provided me
        with personal information, we immediately delete this from our servers. If you are a parent or guardian and you
        are aware that your child has provided us with personal information, please contact me so that we will be able
        to do necessary actions.
      </Text>
      <Text style={styles.subHeaderText}>Changes to This Privacy Policy</Text>
      <Text style={styles.bodyText}>
        We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for
        any changes. we will notify you of any changes by posting the new Privacy Policy on this page. This policy is
        effective as of 2021-03-08.
      </Text>
      <Text style={styles.subHeaderText}>Contact Us</Text>
      <Text style={styles.bodyText}>
        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:contact.hoverapp@gmail.com')}>
        <Text style={styles.mailButton}>contact.hoverapp@gmail.com</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.base,
  },
  bodyText: {
    ...Typography.bodyText,
    paddingBottom: Spacing.smaller,
  },
  subHeaderText: {
    ...Typography.subHeaderText,
    paddingTop: Spacing.base,
  },
  mailButton: {
    ...Typography.bodyText,
    color: Colors.blue,
    textAlign: 'center',
    padding: Spacing.smaller,
  },
});
