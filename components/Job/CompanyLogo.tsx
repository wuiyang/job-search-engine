import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Instance } from 'mobx-state-tree';
import { Company } from 'models/Job';

const IMAGE_SIZE = 80;

const styles = StyleSheet.create({
  image: {
    minWidth: IMAGE_SIZE,
    maxWidth: IMAGE_SIZE,
    minHeight: IMAGE_SIZE,
    maxHeight: IMAGE_SIZE,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    backgroundColor: '#d5d5d5',
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  withImageBackground: {
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: 40,
    color: '#555',
    position: 'absolute',
  },
});

export type CompanyLogoProps = {
  company: Instance<typeof Company>
}

export default function CompanyLogo(props: CompanyLogoProps) {
  const { company: { name: companyName, websiteUrl, logoUrl } } = props;
  const [ useBackground, setUseBackground ] = useState(true);

  const finalLogoUrl = logoUrl || `https://logo.clearbit.com/${websiteUrl}?size=${IMAGE_SIZE}`;
  
  // for companies without logo, use text
  // use image to stack up from the default text
  return (
    <View style={[styles.image, styles.imageWrapper]}>
      <Text style={styles.logoText}>{companyName.charAt(0)}</Text>
      <Image style={[styles.image, useBackground ? styles.withImageBackground : null]} source={{ uri: finalLogoUrl }} onError={() => setUseBackground(false)} />
    </View>
  );
}
