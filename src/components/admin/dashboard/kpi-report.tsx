"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, backgroundColor: "#fff" },
  header: { marginBottom: 20, borderBottomWidth: 2, borderColor: "#007bff", paddingBottom: 8 },
  title: { fontSize: 20, textAlign: "center", color: "#007bff", fontWeight: "bold" },
  section: { marginBottom: 20 },
  kpiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
  },
  kpiBox: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  kpiLabel: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  footer: {
    marginTop: 40,
    fontSize: 10,
    textAlign: "right",
    color: "#999",
  },
})

export function DashboardKPIReport({
  kpis,
  userName,
}: {
  kpis: { totalIdeas: number; totalStartupsConnected: number; totalPocs: number }
  userName: string
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>Relatório de KPIs - Plataforma Ninna Hub</Text>
        </View>

        {/* Boas-vindas */}
        <View style={styles.section}>
          <Text>Olá, {userName}!</Text>
          <Text>
            Aqui está o resumo de desempenho da sua corporação dentro da plataforma de inovação:
          </Text>
        </View>

        {/* KPIs */}
        <View style={styles.kpiContainer}>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>Total de Ideias</Text>
            <Text style={styles.kpiValue}>{kpis.totalIdeas}</Text>
          </View>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>Startups Conectadas</Text>
            <Text style={styles.kpiValue}>{kpis.totalStartupsConnected}</Text>
          </View>
          <View style={styles.kpiBox}>
            <Text style={styles.kpiLabel}>PoCs em Andamento</Text>
            <Text style={styles.kpiValue}>{kpis.totalPocs}</Text>
          </View>
        </View>

        {/* Rodapé */}
        <Text style={styles.footer}>
          Gerado em {new Date().toLocaleDateString("pt-BR")}
        </Text>
      </Page>
    </Document>
  )
}
