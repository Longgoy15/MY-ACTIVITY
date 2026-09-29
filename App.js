import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    const title = input.trim();
    if (!title) return;

    setItems((currentItems) => [
      { id: `${Date.now()}-${Math.random()}`, title, completed: false },
      ...currentItems,
    ]);
    setInput('');
  };

  const toggleItem = (id) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const deleteItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const completedCount = items.filter((item) => item.completed).length;
  const remainingCount = items.length - completedCount;

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index === 0 && styles.firstRow]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.completed }}
        accessibilityLabel={`Mark ${item.title} ${item.completed ? 'incomplete' : 'complete'}`}
        onPress={() => toggleItem(item.id)}
        style={[styles.checkButton, item.completed && styles.checkButtonDone]}
      >
        {item.completed ? <Text style={styles.checkMark}>✓</Text> : null}
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Mark ${item.title} ${item.completed ? 'incomplete' : 'complete'}`}
        onPress={() => toggleItem(item.id)}
        style={styles.itemTextButton}
      >
        <Text style={[styles.itemTitle, item.completed && styles.itemTitleDone]}>
          {item.title}
        </Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Delete ${item.title}`}
        hitSlop={8}
        onPress={() => deleteItem(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.safeArea.backgroundColor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.screen}
      >
        <View style={styles.header}>
          <View style={styles.topline}>
            <Text style={styles.eyebrow}>STUDENT STUDY PLANNER</Text>
          </View>
          <Text style={styles.heading}>{'Study plans,\none step at a time.'}</Text>
          <Text style={styles.subtitle}>Keep assignments and study goals moving.</Text>
        </View>

        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="New assignment or study goal"
            placeholder="Add an assignment or study goal..."
            placeholderTextColor="#87918B"
            returnKeyType="done"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addItem}
            style={styles.input}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add to study list"
            disabled={!input.trim()}
            onPress={addItem}
            style={({ pressed }) => [
              styles.addButton,
              !input.trim() && styles.addButtonDisabled,
              pressed && input.trim() && styles.addButtonPressed,
            ]}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Today</Text>
          <Text style={styles.countText}>{remainingCount} TO DO</Text>
        </View>

        <FlatList
          data={items}
          extraData={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={items.length === 0 ? styles.emptyList : styles.list}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Your study plan starts here.</Text>
              <Text style={styles.emptyCopy}>Add an assignment, reading, or study goal.</Text>
            </View>
          }
        />

        <View style={styles.footer}>
          <View style={styles.footerRule} />
          <Text style={styles.footerText}>
            {completedCount === 0
              ? 'ONE TASK AT A TIME'
              : `${completedCount} ${completedCount === 1 ? 'TASK' : 'TASKS'} DONE. NICE WORK.`}
          </Text>
          <View style={styles.footerRule} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screen: {
    flex: 1,
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 28,
    paddingBottom: 26,
  },
  topline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 29,
  },
  eyebrow: {
    color: '#5D7167',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  heading: {
    color: '#21352B',
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '700',
    letterSpacing: 0,
  },
  subtitle: {
    color: '#718078',
    fontSize: 15,
    marginTop: 10,
  },
  composer: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E8DF',
    borderRadius: 10,
    paddingLeft: 17,
    paddingRight: 7,
    marginBottom: 31,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 54,
    color: '#21352B',
    fontSize: 15,
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#315C46',
    borderRadius: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#AAB8AD',
  },
  addButtonPressed: {
    backgroundColor: '#234633',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 29,
    lineHeight: 33,
    fontWeight: '400',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDE1D8',
  },
  sectionTitle: {
    color: '#263A30',
    fontSize: 19,
    fontWeight: '700',
  },
  countText: {
    color: '#77837A',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E5DE',
    paddingVertical: 12,
  },
  firstRow: {
    borderTopWidth: 0,
  },
  checkButton: {
    width: 23,
    height: 23,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#A5B1A6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  checkButtonDone: {
    borderColor: '#315C46',
    backgroundColor: '#315C46',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
  },
  itemTextButton: {
    flex: 1,
    paddingVertical: 8,
  },
  itemTitle: {
    color: '#293A31',
    fontSize: 15,
    lineHeight: 21,
  },
  itemTitleDone: {
    color: '#929C94',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    minWidth: 58,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    paddingHorizontal: 8,
    backgroundColor: '#F7E8E3',
    borderRadius: 7,
  },
  deleteText: {
    color: '#A64E39',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 25,
  },
  emptyTitle: {
    color: '#34493D',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyCopy: {
    color: '#828D85',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 7,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 12,
  },
  footerRule: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDE1D8',
  },
  footerText: {
    color: '#879188',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
});