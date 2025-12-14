import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFont } from '../../contexts/FontContext';
import { FiChevronDown, FiChevronUp, FiStar } from 'react-icons/fi';

interface Props {
  currentCode?: string;
}

const ExplainLikeImFive: React.FC<Props> = () => {
  const { theme } = useTheme();
  const { uiFont } = useFont();
  const [expanded, setExpanded] = useState<string | null>(null);

  const isDark = theme === 'dark';

  const explanations = {
    linkedList: {
      title: 'What is a Linked List?',
      explanation: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.8', fontSize: '16px' }}>
            Imagine you have a treasure hunt! Each clue points to the next clue. 
            That's exactly what a linked list is!
          </p>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '10px', fontWeight: '600' }}>🎯 The Treasure Hunt:</p>
            <ul style={{ marginLeft: '25px', lineHeight: '2' }}>
              <li>Each clue is like a <strong>node</strong> - it has your treasure (the <strong>data</strong>)</li>
              <li>Each clue also tells you where the next clue is (the <strong>pointer</strong>)</li>
              <li>You start at the first clue (called <strong>head</strong>)</li>
              <li>You follow clues until you find one that says "No more clues!" (that's <strong>NULL</strong>)</li>
            </ul>
          </div>
          <div style={{
            background: isDark ? 'rgba(255, 200, 100, 0.15)' : '#FFF9E6',
            padding: '15px',
            borderRadius: '10px',
            border: `2px solid ${isDark ? 'rgba(255, 200, 100, 0.4)' : '#FFD700'}`,
            marginTop: '15px'
          }}>
            <p style={{ margin: 0, fontStyle: 'italic' }}>
              💡 Think of it like a chain of paper clips! Each paper clip is connected to the next one. 
              You can add or remove paper clips anywhere without breaking the whole chain!
            </p>
          </div>
        </div>
      )
    },
    pointers: {
      title: 'What are Pointers?',
      explanation: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.8', fontSize: '16px' }}>
            Pointers are like arrows that point to where something lives! Like a treasure map with an X marking the spot.
          </p>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '10px', fontWeight: '600' }}>🗺️ The Treasure Map Analogy:</p>
            <ul style={{ marginLeft: '25px', lineHeight: '2' }}>
              <li>A <strong>pointer</strong> is like an arrow on a map saying "the treasure is HERE!"</li>
              <li>It doesn't hold the treasure itself, just tells you where to find it</li>
              <li>If you follow the arrow, you find the actual treasure (the data)</li>
              <li>Just like you can have many arrows pointing to different treasures!</li>
            </ul>
          </div>
          <div style={{
            background: isDark ? 'rgba(100, 200, 255, 0.15)' : '#E3F2FD',
            padding: '15px',
            borderRadius: '10px',
            border: `2px solid ${isDark ? 'rgba(100, 200, 255, 0.4)' : '#2196F3'}`,
            marginTop: '15px'
          }}>
            <p style={{ margin: 0 }}>
              <strong>Real life example:</strong> When you tell a friend "Go to the red house on Main Street", 
              you're pointing them to a location. That's what a pointer does - it points to where data lives in the computer's memory!
            </p>
          </div>
        </div>
      )
    },
    insert: {
      title: 'How do we Add Things?',
      explanation: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.8', fontSize: '16px' }}>
            Adding to a linked list is like adding a new friend to your game of "Follow the Leader"!
          </p>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '10px', fontWeight: '600' }}>👥 Adding at the Beginning:</p>
            <ul style={{ marginLeft: '25px', lineHeight: '2' }}>
              <li>You make a new friend</li>
              <li>They point to the person who was first</li>
              <li>Now THEY become the new first person!</li>
              <li>Everyone else follows behind them</li>
            </ul>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '10px', fontWeight: '600' }}>👥 Adding at the End:</p>
            <ul style={{ marginLeft: '25px', lineHeight: '2' }}>
              <li>You walk through the whole line of friends</li>
              <li>Find the last person</li>
              <li>Tell them to point to the new friend</li>
              <li>The new friend points to nobody (they're last!)</li>
            </ul>
          </div>
          <div style={{
            background: isDark ? 'rgba(150, 255, 150, 0.15)' : '#E8F5E9',
            padding: '15px',
            borderRadius: '10px',
            border: `2px solid ${isDark ? 'rgba(150, 255, 150, 0.4)' : '#4CAF50'}`,
            marginTop: '15px'
          }}>
            <p style={{ margin: 0 }}>
              <strong>Why it's cool:</strong> Unlike a line where everyone has to scoot over, 
              you can add someone anywhere without moving anyone else! Just change where people point!
            </p>
          </div>
        </div>
      )
    },
    delete: {
      title: 'How do we Remove Things?',
      explanation: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.8', fontSize: '16px' }}>
            Removing is like when a friend leaves the game - we just tell the person behind them to follow the person in front!
          </p>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '10px', fontWeight: '600' }}>🚪 Removing a Friend:</p>
            <ol style={{ marginLeft: '25px', lineHeight: '2' }}>
              <li>Find the friend who wants to leave</li>
              <li>Tell the friend BEHIND them: "Now follow the friend IN FRONT of the leaving friend!"</li>
              <li>The leaving friend is now skipped!</li>
              <li>The line continues without them</li>
            </ol>
          </div>
          <div style={{
            background: isDark ? 'rgba(255, 150, 150, 0.15)' : '#FFEBEE',
            padding: '15px',
            borderRadius: '10px',
            border: `2px solid ${isDark ? 'rgba(255, 150, 150, 0.4)' : '#F44336'}`,
            marginTop: '15px'
          }}>
            <p style={{ margin: 0 }}>
              <strong>Important:</strong> We make sure to tell everyone to skip the leaving friend, 
              otherwise they might try to follow someone who's not there anymore! (That's a memory leak!)
            </p>
          </div>
        </div>
      )
    },
    traverse: {
      title: 'How do we Look at Everything?',
      explanation: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.8', fontSize: '16px' }}>
            Traversing is like reading a storybook page by page - you start at the beginning and go through everything!
          </p>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '10px', fontWeight: '600' }}>📖 Reading the Story:</p>
            <ol style={{ marginLeft: '25px', lineHeight: '2' }}>
              <li>Start at the first page (the head)</li>
              <li>Read the page</li>
              <li>Turn to the next page (follow the pointer)</li>
              <li>Keep going until you reach "The End" (NULL)</li>
            </ol>
          </div>
          <div style={{
            background: isDark ? 'rgba(200, 150, 255, 0.15)' : '#F3E5F5',
            padding: '15px',
            borderRadius: '10px',
            border: `2px solid ${isDark ? 'rgba(200, 150, 255, 0.4)' : '#9C27B0'}`,
            marginTop: '15px'
          }}>
            <p style={{ margin: 0 }}>
              <strong>Remember:</strong> You can only go forward in a singly linked list - like reading a book, 
              you can't skip backwards! You have to start from the beginning each time.
            </p>
          </div>
        </div>
      )
    },
    memory: {
      title: 'What is Memory Management?',
      explanation: (
        <div>
          <p style={{ marginBottom: '15px', lineHeight: '1.8', fontSize: '16px' }}>
            Think of memory like a toy box! When you're done playing with a toy, you put it back so others can use it.
          </p>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ marginBottom: '10px', fontWeight: '600' }}>🧸 The Toy Box Analogy:</p>
            <ul style={{ marginLeft: '25px', lineHeight: '2' }}>
              <li><strong>new Node</strong> = Taking a toy OUT of the toy box</li>
              <li><strong>delete</strong> = Putting the toy BACK in the toy box</li>
              <li>If you forget to put toys back, the box gets full and nobody can play!</li>
              <li>That's called a <strong>memory leak</strong> - the computer runs out of space!</li>
            </ul>
          </div>
          <div style={{
            background: isDark ? 'rgba(255, 220, 100, 0.15)' : '#FFF3E0',
            padding: '15px',
            borderRadius: '10px',
            border: `2px solid ${isDark ? 'rgba(255, 220, 100, 0.4)' : '#FF9800'}`,
            marginTop: '15px'
          }}>
            <p style={{ margin: 0 }}>
              <strong>Always remember:</strong> When you're done using a node, delete it! 
              Like cleaning up your toys so the toy box doesn't overflow! 🧹
            </p>
          </div>
        </div>
      )
    }
  };

  const bgColor = isDark 
    ? 'rgba(20, 20, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.25)';
  const textColor = isDark ? '#e0e0e0' : '#333';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';
  const headerBg = isDark ? 'rgba(30, 30, 40, 0.6)' : 'rgba(255, 255, 255, 0.2)';
  const accentColor = isDark ? '#ffd700' : '#FF6B6B';

  return (
    <div style={{
      background: bgColor,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      padding: '25px',
      borderRadius: '16px',
      border: `1px solid ${borderColor}`,
      marginBottom: '20px',
      boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <FiStar size={24} color={accentColor} />
        <h3 style={{
          color: textColor,
          fontSize: '20px',
          fontWeight: '700',
          margin: 0,
          fontFamily: uiFont
        }}>
          Explain Like I'm 5! 👶
        </h3>
      </div>

      <p style={{
        color: isDark ? '#b0b0b0' : '#555',
        marginBottom: '20px',
        lineHeight: '1.6',
        fontSize: '14px'
      }}>
        Don't understand something? Click below to learn in super simple words! 
        Just like explaining to a 5-year-old! 🎈
      </p>

      {Object.entries(explanations).map(([key, section]) => (
        <div
          key={key}
          style={{
            marginBottom: '15px',
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            overflow: 'hidden',
            background: headerBg,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <div
            onClick={() => setExpanded(expanded === key ? null : key)}
            style={{
              padding: '15px 18px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark 
                ? 'rgba(40, 40, 50, 0.8)' 
                : 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = headerBg;
            }}
          >
            <span style={{ 
              color: textColor, 
              fontWeight: '600',
              fontSize: '16px',
              fontFamily: uiFont
            }}>
              {section.title}
            </span>
            {expanded === key ? 
              <FiChevronUp size={20} color={textColor} /> : 
              <FiChevronDown size={20} color={textColor} />
            }
          </div>

          {expanded === key && (
            <div style={{
              padding: '20px',
              borderTop: `1px solid ${borderColor}`,
              background: isDark ? 'rgba(15, 15, 20, 0.5)' : 'rgba(255, 255, 255, 0.15)',
              color: textColor,
              fontFamily: uiFont
            }}>
              {section.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExplainLikeImFive;
