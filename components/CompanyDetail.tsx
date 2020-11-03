import * as React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';

import { Company } from 'models/Job';
import { Instance } from 'mobx-state-tree';

const styles = StyleSheet.create({
  descriptionHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  normalText: {
    fontSize: 15,
    marginTop: 5
  },
  link: {
    color: '#007bff'
  }
});

export type CompanyDetailProps = {
  company: Instance<typeof Company>
}

export default function CompanyDetail(props: CompanyDetailProps) {
  const { company } = props;
  return (
    <View>
      <Text style={styles.descriptionHeader}>Company</Text>
      <Text style={styles.normalText}>{company.name}</Text>
      <LinkText linkPrepend="https://www.twitter.com/" link={company.twitter}>
        Company's Twitter
      </LinkText>
      <LinkText link={company.websiteUrl}>
        Company's Website
      </LinkText>
    </View>
  );
}

type LinkTextProps = {
  linkPrepend?: string,
  link?: string | null,
  children: React.ReactNode,
}

function LinkText(props: LinkTextProps) {
  const { linkPrepend, link, children } = props;
  let finalLink: string = link ?? '';

  // value for apply url
  if (link == null || link.length === 0) {
    return null;
  }

  if (linkPrepend) {
    finalLink = linkPrepend + finalLink;
  }

  return (
    <Text style={[styles.normalText, styles.link]} onPress={() => Linking.openURL(finalLink)}>
      {children}
    </Text>
  );
}

