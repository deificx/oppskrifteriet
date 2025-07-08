<template>
  <article>
    <aside>Start time {{ time.format(now) }}</aside>
    <ol id="recipe">
      <recipe-step
        v-for="(step, idx) of steps"
        v-bind="step"
        :disabled="idx !== currentStep"
        :idx="idx"
        :key="idx"
        @completed="onCompleted"
      />
    </ol>
  </article>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import RecipeStep from "@/components/recipe-step.vue";
import type { Step } from "@/types";
import { time } from "@/utils/time";

const now = ref<Date>();
const timer = ref<number>();
const currentStep = ref<number>(0);

const steps: Step[] = [
  {
    type: "step",
    duration: 600,
    text: "Ha kald melk, sukker, mel, egg, kardemomme og søt surdeig i en kjøkkenmaskin, og elt til deigen samler seg.",
  },
  {
    type: "rest",
    duration: 3600,
    text: "La deigen hvile 1 time.",
  },
  { type: "step", duration: 120, text: "Del kaldt smør i terninger" },
  {
    type: "step",
    duration: 600,
    text: "Tilsett salt og smørret. Ha i gradvis mens maskinen går på svak hastighet, og elt helt til deigen er smidig. Øk hastigheten mot slutten.",
  },
  {
    type: "rest",
    duration: 7200,
    text: "Dekk til med plast, eller i en bolle med lokk, slik at deigen ikke tørker ut, og la deigen hvile i romtemperatur i 2 timer",
  },
  {
    type: "rest",
    duration: 43200,
    text: "Sett deigen i kjøleskapet til neste dag.",
  },
  {
    type: "step",
    duration: 120,
    text: "Bland romtemperert smør, sukker og kanel til en jevn og smørbar blanding.",
  },
  {
    type: "step",
    duration: 120,
    text: "Strø et tynt lag hvetemel på kjøkkenbenken, og velt deigen ut av bakebollen.",
  },
  {
    type: "step",
    duration: 120,
    text: "Kjevle deigen ut til et rektangel (størrelse 1:2) med en tykkelse på 0,5 cm.",
  },
  {
    type: "step",
    duration: 180,
    text: "Smør jevnt utover blandingen av smør, sukker og kanel.",
  },
  {
    type: "step",
    duration: 20,
    text: "Brett den ene langsiden ⅔ over.",
  },
  {
    type: "step",
    duration: 20,
    text: "Brett den andre langsiden ⅓ over motsatt vei.",
  },
  { type: "step", duration: 120, text: "Del deigen i 18 remser." },
  {
    type: "step",
    duration: 10,
    text: "Ta hver remse, hold fast i den ene enden mellom peke- og midtfinger, og tvinn 2-3 ganger rundt fingrene. Trekk så motsatt ende ned gjennom midten.",
  },
  {
    type: "step",
    duration: 10,
    text: "Sett de ferdigsnurrede kanelsnurrene med surdeig på stekebrett med bakepapir.",
  },
  {
    type: "rest",
    duration: 43200,
    text: "Dekk til med plast, og la stå til heving i 8-12 timer.",
  },
  {
    type: "step",
    duration: 10,
    text: "Pisk et egg, og pensle over kanelsnurrene.",
  },
  { type: "step", duration: 10, text: "Strø over perlesukker." },
  {
    type: "rest",
    duration: 10,
    text: " Stek i 18-20 min midt i ovnen på 200 C.",
  },
  {
    type: "step",
    duration: 10,
    text: "La kanelsnurrene hvile 20-30 min på rist før du setter tenna i dem.",
  },
];

function onCompleted(idx: number) {
  currentStep.value = idx + 1;
}

onMounted(() => {
  now.value = new Date();
  timer.value = window.setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onBeforeMount(() => {
  window.clearInterval(timer.value);
});
</script>
