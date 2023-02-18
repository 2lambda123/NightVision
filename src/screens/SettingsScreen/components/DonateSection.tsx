import {
  Text,
  Button,
  Image,
  View,
  TextStyle,
  ImageStyle,
  ViewStyle,
  PlatformColor,
} from 'react-native';

import { ListSection, ListCell } from '@/components';
import { InAppPurchase } from '../helpers/InAppPurchase';
import { useCallback } from 'react';
import { human } from 'react-native-typography';
import { useAsyncMemo } from '@/hooks';
import { t } from '@/locales';

const iconCoffee = require('@/assets/coffee.png');

export function DonateSection() {
  const product = useAsyncMemo(async () => {
    await InAppPurchase.shared.init();
    return await InAppPurchase.shared.getProduct();
  }, []);

  const handlePurchase = useCallback(async () => {
    await InAppPurchase.shared.init();
    await InAppPurchase.shared.requestPurchase();
  }, []);

  return (
    <ListSection>
      <ListCell style={$container} bottomSeparator={false} onPress={handlePurchase}>
        <Image style={$icon} source={iconCoffee} />

        <View style={$textContainer}>
          <Text style={$title} adjustsFontSizeToFit numberOfLines={1}>
            {t('settingsScreen.donate.title')}
          </Text>
          <Text style={$subtitle} adjustsFontSizeToFit numberOfLines={2}>
            {t('settingsScreen.donate.subtitle')}
          </Text>
        </View>

        <Button title={product?.localizedPrice ?? '-'} onPress={handlePurchase} />
      </ListCell>
    </ListSection>
  );
}

const $container: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 8,
  alignItems: 'center',
};

const $textContainer: ViewStyle = {
  marginHorizontal: 12,
  flex: 1,
};

const $title: TextStyle = {
  ...human.title3Object,
  color: PlatformColor('label'),
  fontWeight: '500',
};

const $subtitle: TextStyle = {
  ...human.footnoteObject,
  color: PlatformColor('secondaryLabel'),
  marginTop: 4,
};

const $icon: ImageStyle = {
  width: 50,
  height: 50,
};
