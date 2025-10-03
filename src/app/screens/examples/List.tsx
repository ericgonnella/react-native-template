import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';
import {useApp} from '../../state/AppContext';
import {SafeArea} from '../../../components/layout/SafeArea';
import {Container} from '../../../components/layout/Container';
import {Card} from '../../../components/UI/Card';
import {LoadingSpinner} from '../../../components/UI/LoadingSpinner';
import {ErrorBanner} from '../../../components/UI/ErrorBanner';
import {EmptyState} from '../../../components/UI/EmptyState';
import {withRandomFailure} from '../../mock/delay';
import mockItems from '../../mock/items.json';

type ListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'List'>;
};

interface Item {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  createdAt: string;
  imageUrl: string;
}

const ListScreen: React.FC<ListScreenProps> = ({navigation}) => {
  const {theme} = useApp();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    setLoading(true);
    setError(null);

    try {
      await withRandomFailure(async () => {
        setItems(mockItems as Item[]);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderItem = ({item}: {item: Item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {id: item.id})}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${item.title}`}>
      <Card style={styles.itemCard}>
        <Text style={[styles.itemTitle, {color: theme.colors.text}]}>{item.title}</Text>
        <Text style={[styles.itemSubtitle, {color: theme.colors.textSecondary}]}>
          {item.subtitle}
        </Text>
        <Text style={[styles.itemDate, {color: theme.colors.textSecondary}]}>
          {formatDate(item.createdAt)}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeArea>
        <LoadingSpinner />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <Container>
        {error && <ErrorBanner message={error} onRetry={loadItems} />}

        {!error && items.length === 0 && (
          <EmptyState message="No data yet. Check back later!" />
        )}

        {!error && items.length > 0 && (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        )}
      </Container>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  itemCard: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 12,
  },
});

export default ListScreen;
