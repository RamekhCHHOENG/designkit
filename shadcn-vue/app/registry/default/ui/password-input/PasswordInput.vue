<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import { EyeIcon, EyeOffIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface PasswordInputProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  showStrength?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PasswordInputProps>(), {
  modelValue: "",
  placeholder: "Enter password",
  disabled: false,
  showStrength: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const visible = ref(false);
const capsLockActive = ref(false);

function handleInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
}

function handleKey(e: KeyboardEvent) {
  capsLockActive.value = e.getModifierState("CapsLock");
}

function calculateStrength(pwd: string): { score: number; label: string } {
  if (!pwd) return { score: 0, label: "Empty" };
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (pwd.length >= 12) score += 1;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

  const normalized = Math.min(4, Math.max(1, score - 1));
  const labels = ["Weak", "Fair", "Good", "Strong"];
  return { score: normalized, label: labels[normalized - 1] ?? "Weak" };
}

const strength = computed(() => {
  return props.showStrength && props.modelValue
    ? calculateStrength(props.modelValue)
    : null;
});

const strengthColors = ["bg-red-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"];
const strengthColor = computed(() => {
  return strength.value ? strengthColors[strength.value.score - 1] : "";
});
</script>

<template>
  <div class="w-full space-y-1.5" data-slot="password-input-root">
    <div
      :class="
        cn(
          'relative flex items-center h-8 w-full rounded-lg border border-input bg-transparent transition-colors',
          'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
          disabled && 'opacity-50 pointer-events-none bg-input/50',
          props.class
        )
      "
    >
      <input
        :type="visible ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="h-full w-full bg-transparent px-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground pr-8 text-foreground"
        @input="handleInput"
        @keydown="handleKey"
        @keyup="handleKey"
      />
      <button
        type="button"
        tabindex="-1"
        :disabled="disabled"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        class="absolute right-2 flex size-5 items-center justify-center text-muted-foreground hover:text-foreground outline-none transition-colors"
        @click="visible = !visible"
      >
        <EyeOffIcon v-if="visible" class="size-3.5" />
        <EyeIcon v-else class="size-3.5" />
      </button>
    </div>

    <p v-if="capsLockActive" class="text-[11px] text-amber-500 font-medium">
      Caps Lock is on
    </p>

    <div v-if="showStrength && strength" class="space-y-1 pt-0.5">
      <div class="flex h-1 w-full gap-1 overflow-hidden rounded-full bg-muted">
        <div
          v-for="level in 4"
          :key="level"
          :class="
            cn(
              'h-full flex-1 transition-all duration-300',
              level <= strength.score ? strengthColor : 'bg-transparent'
            )
          "
        />
      </div>
      <div class="flex justify-between text-[11px] text-muted-foreground">
        <span>Password strength</span>
        <span class="font-medium text-foreground">{{ strength.label }}</span>
      </div>
    </div>
  </div>
</template>
