import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { Instance } from 'mobx-state-tree';
import { Company } from 'models/Job';
import { baseStyles, CompanyLogoStyles } from 'constants/Styles';
import { Size } from 'constants/Sizes';

export type CompanyLogoProps = {
  company: Instance<typeof Company>
}

export default function CompanyLogo(props: CompanyLogoProps) {
  const { company: { name: companyName, websiteUrl, logoUrl } } = props;
  const [ useBackground, setUseBackground ] = useState(true);

  const finalLogoUrl = logoUrl || `https://logo.clearbit.com/${websiteUrl}?size=${Size.imageSize}`;
  
  // for companies without logo, use text
  // use image to stack up from the default text
  return (
    <View style={[CompanyLogoStyles.image, CompanyLogoStyles.imageWrapper]}>
      <Text style={CompanyLogoStyles.logoText}>{companyName.charAt(0)}</Text>
      <Image
        style={[CompanyLogoStyles.image, useBackground ? baseStyles.backgroundColorLight : null]}
        source={{ uri: finalLogoUrl }}
        onError={() => setUseBackground(false)}
      />
    </View>
  );
}
