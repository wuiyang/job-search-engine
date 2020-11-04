import * as React from 'react';
import { View, Text, Linking } from 'react-native';

import { Company } from 'models/Job';
import { Instance } from 'mobx-state-tree';
import { SharedStyles } from 'constants/Styles';

export type CompanyDetailProps = {
  company: Instance<typeof Company>
};

export default function CompanyDetail(props: CompanyDetailProps) {
  const { company } = props;
  return (
    <View>
      <Text style={SharedStyles.textHeaderMargin}>Company</Text>
      <Text style={SharedStyles.textLargeMargin}>{company.name}</Text>
      <LinkText linkPrepend="https://twitter.com/" link={company.twitter}>
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
};

function LinkText(props: LinkTextProps) {
  const { linkPrepend, link, children } = props;
  let finalLink: string = link ?? '';

  // value for apply url
  if (link == null || link.length === 0) {
    return null;
  }

  if (linkPrepend && !finalLink.includes(linkPrepend)) {
    finalLink = linkPrepend + finalLink;
  }

  return (
    <Text style={SharedStyles.linkText} onPress={() => Linking.openURL(finalLink)}>
      {children}
    </Text>
  );
}

