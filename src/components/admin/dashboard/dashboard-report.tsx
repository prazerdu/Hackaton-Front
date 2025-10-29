"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 18, marginBottom: 10, textAlign: "center" },
  table: { flexDirection: "column", width: "100%", marginTop: 20 },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
  },
  cellHeader: {
    flex: 1,
    fontWeight: "bold",
    padding: 5,
    backgroundColor: "#eee",
  },
  cell: { flex: 1, padding: 5 },
})

export function DashboardReport({ data }: { data: { etapa: string; total: number }[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Relatório do Funil de Inovação</Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cellHeader}>Etapa</Text>
            <Text style={styles.cellHeader}>Total de Ideias</Text>
          </View>

          {data.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.etapa}</Text>
              <Text style={styles.cell}>{item.total}</Text>
            </View>
          ))}
        </View>

        <Text
          style={{
            marginTop: 20,
            fontSize: 10,
            textAlign: "right",
          }}
        >
          Gerado em {new Date().toLocaleDateString("pt-BR")}
        </Text>
      </Page>
    </Document>
  )
}
