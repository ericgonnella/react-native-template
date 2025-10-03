import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {useApp} from '../../state/AppContext';
import {SafeArea} from '../../../components/layout/SafeArea';
import {Container} from '../../../components/layout/Container';
import {Card} from '../../../components/UI/Card';
import {LoadingSpinner} from '../../../components/UI/LoadingSpinner';
import {ErrorBanner} from '../../../components/UI/ErrorBanner';
import {withRandomFailure} from '../../mock/delay';
import mockItems from '../../mock/items.json';

type DetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Detail'>;
  route: RouteProp<RootStackParamList, 'Detail'>;
};

interface Item {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  createdAt: string;
  imageUrl: string;
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  'placeholder-1': 'https://via.placeholder.com/600x300/007AFF/FFFFFF?text=Placeholder+1',
  'placeholder-2': 'https://via.placeholder.com/600x300/34C759/FFFFFF?text=Placeholder+2',
  'placeholder-3': 'https://via.placeholder.com/600x300/FF9500/FFFFFF?text=Placeholder+3',
};

const DetailScreen: React.FC<DetailScreenProps> = ({route, navigation}) => {
  const {theme} = useApp();
  const {id} = route.params;
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItem = async () => {
    setLoading(true);
    setError(null);

    try {
      await withRandomFailure(async () => {
        const found = (mockItems as Item[]).find(i => i.id === id);
        if (!found) {
          throw new Error(`Item with id "${id}" not found`);
        }
        setItem(found);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load item');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItem();
  }, [id]);

  useEffect(() => {
    if (item) {
      navigation.setOptions({title: item.title});
    }
  }, [item, navigation]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <SafeArea>
        <LoadingSpinner />
      </SafeArea>
    );
  }

  if (error) {
    return (
      <SafeArea>
        <Container>
          <ErrorBanner message={error} onRetry={loadItem} />
        </Container>
      </SafeArea>
    );
  }

  if (!item) {
    return (
      <SafeArea>
        <Container>
          <Text style={[styles.notFound, {color: theme.colors.textSecondary}]}>
            Item not found
          </Text>
        </Container>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ScrollView>
        <Container>
          <Image
            source={{uri: PLACEHOLDER_IMAGES[item.imageUrl]}}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.content}>
            <Text style={[styles.title, {color: theme.colors.text}]}>{item.title}</Text>
            <Text style={[styles.subtitle, {color: theme.colors.textSecondary}]}>
              {item.subtitle}
            </Text>

            <Card style={styles.card}>
              <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Summary</Text>
              <Text style={[styles.summary, {color: theme.colors.text}]}>{item.summary}</Text>
            </Card>

            <Card style={styles.card}>
              <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Created</Text>
              <Text style={[styles.value, {color: theme.colors.text}]}>
                {formatDate(item.createdAt)}
              </Text>
            </Card>

            <Card style={styles.card}>
              <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Item ID</Text>
              <Text style={[styles.value, {color: theme.colors.text}]}>{item.id}</Text>
            </Card>

            <Text style={[styles.fakeLabel, {color: theme.colors.warning}]}>
              ⚠️ FAKE DATA - All content is placeholder/mock data
            </Text>
          </View>
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
  },
  value: {
    fontSize: 16,
  },
  notFound: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  fakeLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default DetailScreen;
