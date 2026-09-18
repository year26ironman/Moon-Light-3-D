import React from 'react';
import { ArrowRight, Cpu, Link as LinkIcon, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

type VerifyStatus =
  | 'idle'
  | 'proving'
  | 'submitting'
  | 'eligible'
  | 'ineligible'
  | 'error';

interface PrivacyFlowVizProps {
  status: VerifyStatus;
}

const getFlowSteps = (status: VerifyStatus) => [
  {
    id: 'local',
    label: 'Your Private Data',
    sublabel: 'GPA & income remain on your device',
    icon: Lock,
    active: [
      'proving',
      'submitting',
      'eligible',
      'ineligible',
    ].includes(status),
  },
  {
    id: 'circuit',
    label: 'ZK Circuit (Local)',
    sublabel: 'Proof generated through WASM',
    icon: Cpu,
    active: status === 'proving',
  },
  {
    id: 'chain',
    label: 'Midnight Blockchain',
    sublabel: 'Cryptographic proof is recorded',
    icon: LinkIcon,
    active: ['submitting', 'eligible', 'ineligible'].includes(status),
  },
];

export default function PrivacyFlowViz({
  status,
}: PrivacyFlowVizProps) {
  const steps = getFlowSteps(status);

  return (
    <div className="card privacy-viz-card">
      <h3 className="section-title">Observable Privacy Behavior</h3>

      <div className="privacy-steps-container">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <motion.div
                className={`privacy-step${step.active ? ' active' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
              >
                <div className="step-icon">
                  <Icon size={24} />
                </div>

                <div className="step-label">{step.label}</div>

                <div className="step-sublabel">
                  {step.sublabel}
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="step-arrow" aria-hidden="true">
                  <ArrowRight size={20} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="privacy-notice">
        <Lock
          size={16}
          className="inline-icon"
          aria-hidden="true"
        />

        <span>
          <strong>
            Your actual GPA and income never leave your device.
          </strong>{' '}
          The Midnight blockchain records only the cryptographic
          proof needed to verify that the eligibility conditions
          were satisfied.
        </span>
      </div>
    </div>
  );
}
