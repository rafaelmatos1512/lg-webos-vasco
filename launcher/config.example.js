// Copie para launcher/config.js e ajuste.
window.CONFIG = {
  // Nome que aparece na saudação ("Bom dia, Fulano"). Deixe vazio para só "Bom dia".
  name: "",

  // Id do time no TheSportsDB para o card de jogo. 134282 é o Vasco.
  teamId: "134282",

  // Colunas da grade de apps.
  columns: 5,

  // true: mostra só os apps listados abaixo. false: mostra todos os apps da TV.
  onlyListed: true,

  // Primeira linha (dock) e segunda linha. São ids de app do webOS.
  dockApps: ["netflix", "youtube.leanback.v4", "amazon", "com.disney.disneyplus-prod"],
  rowTwo: ["spotify-beehive", "com.apple.appletv"],

  // Apps que nunca devem aparecer.
  hiddenApps: ["com.gathin.tvhome", "com.local.nativehome"]
};
