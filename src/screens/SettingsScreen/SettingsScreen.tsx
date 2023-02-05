import {
  Image,
  ImageStyle,
  PlatformColor,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  Linking,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { human } from 'react-native-typography';
import { SFSymbol } from 'react-native-sfsymbols';
import Mailer from 'react-native-mail';

import { AppStackParamList } from '@/navigators';
import { ListCell, ListSection, SafeAreaScrollView, TextButton } from '@/components';
import { t } from '@/locales';
import Config from '@/config';
import { openPrivacyPolicy, openRecommendAppStore, openUserAgreement } from './helpers/openUri';
import { useColorScheme } from 'react-native';
import { Application, Device } from '@/utils';

const AppIcon = require('@/assets/app-icon.png');

export const SettingsScreen = observer<NativeStackScreenProps<AppStackParamList, 'Settings'>>(
  (props) => {
    const isDark = useColorScheme() === 'dark';

    useEffect(() => {
      props.navigation.setOptions({
        headerLeft: () => <TextButton text={t('common.close')} onPress={props.navigation.goBack} />,
      });
    }, []);

    function openDeveloperEmail() {
      Mailer.mail(
        {
          recipients: [Config.email],
          subject: '夜视仪反馈',
          body: `
  
  
               Device: ${Device.modelName}
               iOS Version: ${Device.version}
               App Version: ${Application.version}(${Application.buildNumber})
        `,
        },
        (err) => {
          if (!err) {
            return;
          }
          Linking.openURL(`mailto:${Config.email}`);
        },
      );
    }

    return (
      <>
        <StatusBar barStyle="light-content" hidden={false} animated />
        <SafeAreaScrollView
          style={{
            backgroundColor: isDark
              ? PlatformColor('systemBackground')
              : PlatformColor('secondarySystemBackground'),
          }}
          contentContainerStyle={$contentContainer}
        >
          <ListSection>
            <ListCell
              text={t('settingsScreen.version')}
              rightIcon={null}
              RightAccessory={`${Application.version}(${Application.buildNumber})`}
            />
            <ListCell
              text={t('settingsScreen.goodReview')}
              bottomSeparator={false}
              onPress={() => {
                Linking.openURL(
                  `https://apps.apple.com/app/apple-store/id${Config.appId}?action=write-review`,
                );
              }}
            />
          </ListSection>
          <ListSection headerText={t('settingsScreen.agreement')}>
            <ListCell
              text={t('settingsScreen.privacyPolicy')}
              onPress={() => openPrivacyPolicy()}
            />
            <ListCell
              text={t('settingsScreen.userAgreement')}
              bottomSeparator={false}
              onPress={() => openUserAgreement()}
            />
          </ListSection>
          <ListSection>
            <ListCell
              text={t('settingsScreen.connect')}
              bottomSeparator={false}
              RightAccessory={Config.email}
              onPress={openDeveloperEmail}
            />
          </ListSection>
          <ListSection headerText={t('settingsScreen.recommend.title')}>
            <ListCell style={$recommend} bottomSeparator={false} onPress={openRecommendAppStore}>
              <Image style={$appIcon} source={AppIcon} />
              <View style={{ flex: 1 }}>
                <Text style={[human.body, $appName]}>{t('settingsScreen.recommend.appName')}</Text>
                <Text style={[human.subhead, $desc]}>{t('settingsScreen.recommend.desc')}</Text>
              </View>
              <SFSymbol
                style={{
                  width: 18,
                  height: 18,
                }}
                name="chevron.right"
                weight="medium"
                color={PlatformColor('opaqueSeparator')}
              />
            </ListCell>
          </ListSection>
        </SafeAreaScrollView>
      </>
    );
  },
);

const $contentContainer: ViewStyle = {
  paddingTop: 20,
  paddingHorizontal: 20,
};

const $recommend: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 10,
};

const $appIcon: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: PlatformColor('systemGray5'),
  marginRight: 16,
};

const $appName: TextStyle = {
  color: PlatformColor('label'),
  marginBottom: 4,
};

const $desc: TextStyle = {
  color: PlatformColor('secondaryLabel'),
};
