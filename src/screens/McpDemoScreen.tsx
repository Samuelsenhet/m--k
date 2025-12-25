import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import MCP from '../mcp/client';

const McpDemoScreen: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);

  useEffect(() => {
    let sub: any;
    (async () => {
      const { sessionId } = await MCP.createSession();
      setSessionId(sessionId);
      sub = MCP.subscribe(sessionId, (event, payload) => {
        setEvents(e => [`${event}: ${JSON.stringify(payload)}`, ...e].slice(0, 50));
      });
      const t = await MCP.listTools();
      setTools(t.tools || []);
    })();

    return () => sub?.close?.();
  }, []);

  const insertExample = async () => {
    if (!sessionId) return;
    const record = { title: 'Demo note', text: `Created at ${new Date().toISOString()}` };
    const r = await MCP.invoke(sessionId, 'insert_info', { record });
    setEvents(e => [`invoke: insert_info -> ${JSON.stringify(r)}`, ...e].slice(0, 50));
  };

  const readAll = async () => {
    if (!sessionId) return;
    const r = await MCP.invoke(sessionId, 'read_info', {});
    setEvents(e => [`invoke: read_info -> ${JSON.stringify(r)}`, ...e].slice(0, 50));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MCP Demo</Text>
      <Text style={styles.text}>Session: {sessionId ?? '...'}</Text>
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={insertExample}><Text style={styles.buttonText}>Insert</Text></Pressable>
        <Pressable style={styles.button} onPress={readAll}><Text style={styles.buttonText}>Read all</Text></Pressable>
      </View>

      <Text style={styles.sub}>Available tools: {tools.join(', ')}</Text>

      <View style={styles.events}>
        {events.map((ev, i) => (
          <Text key={i} style={styles.eventItem}>{ev}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, minHeight: '100%', backgroundColor: '#F9FAFB' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  text: { color: '#374151', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  button: { backgroundColor: '#2563EB', padding: 10, borderRadius: 8, marginRight: 8 },
  buttonText: { color: '#fff', fontWeight: '700' },
  sub: { marginBottom: 8, color: '#6B7280' },
  events: { marginTop: 12 },
  eventItem: { color: '#111827', marginBottom: 6 },
});

export default McpDemoScreen;
