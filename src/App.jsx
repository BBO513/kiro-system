import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  FileText, 
  Layers, 
  CheckSquare, 
  MessageSquare, 
  Settings, 
  Play, 
  Sparkles,
  Code,
  Database,
  GitBranch,
  Zap,
  FileCode,
  BookOpen,
  ListChecks
} from 'lucide-react'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [activeSpec, setActiveSpec] = useState(null)
  const [specs, setSpecs] = useState([])
  const [mcpServers, setMcpServers] = useState([
    { name: 'GitLab', status: 'connected', tools: ['get_issue', 'list_project_issues', 'create_merge_request'] },
    { name: 'Database', status: 'connected', tools: ['query', 'schema_info'] }
  ])

  const generateSpec = () => {
    if (!prompt.trim()) return

    const newSpec = {
      id: Date.now(),
      title: prompt.slice(0, 50),
      status: 'in-progress',
      requirements: generateRequirements(prompt),
      design: generateDesign(prompt),
      tasks: generateTasks(prompt)
    }

    setSpecs([...specs, newSpec])
    setActiveSpec(newSpec)
    setPrompt('')
  }

  const generateRequirements = (prompt) => {
    return `# Requirements

## User Stories

### Story 1: ${prompt}

**As a** developer  
**I want** to implement ${prompt}  
**So that** users can benefit from this feature

## Acceptance Criteria (EARS Notation)

**WHEN** a user initiates the feature  
**THE SYSTEM SHALL** respond with appropriate feedback

**WHEN** the feature is activated  
**THE SYSTEM SHALL** validate all inputs before processing

**WHEN** an error occurs  
**THE SYSTEM SHALL** display a clear error message to the user

**WHEN** the operation completes successfully  
**THE SYSTEM SHALL** update the UI to reflect the changes`
  }

  const generateDesign = (prompt) => {
    return `# Design Document

## Architecture Overview

This feature will be implemented using a modular architecture with clear separation of concerns.

## Components

### Frontend Components
- **UI Layer**: React components with TypeScript
- **State Management**: Context API / Redux
- **API Client**: Axios for HTTP requests

### Backend Services
- **API Endpoints**: RESTful API design
- **Business Logic**: Service layer
- **Data Access**: Repository pattern

## Data Flow

\`\`\`
User Input → Validation → API Request → Business Logic → Database → Response → UI Update
\`\`\`

## Data Models

### Primary Entity
\`\`\`typescript
interface Feature {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
\`\`\`

## API Specifications

### Endpoints

**POST /api/features**
- Creates a new feature
- Request body: \`{ name: string, description: string }\`
- Response: \`{ id: string, ...Feature }\`

**GET /api/features/:id**
- Retrieves feature details
- Response: \`Feature\`

## Error Handling

- Input validation errors: 400 Bad Request
- Authentication errors: 401 Unauthorized
- Resource not found: 404 Not Found
- Server errors: 500 Internal Server Error

## Security Considerations

- Input sanitization
- Authentication and authorization
- Rate limiting
- CORS configuration

## Performance Requirements

- API response time: < 200ms
- Database query optimization
- Caching strategy for frequently accessed data`
  }

  const generateTasks = (prompt) => {
    return [
      { id: 1, title: 'Set up project structure', status: 'pending', description: 'Initialize repository and configure build tools' },
      { id: 2, title: 'Implement data models', status: 'pending', description: 'Create TypeScript interfaces and database schemas' },
      { id: 3, title: 'Build API endpoints', status: 'pending', description: 'Develop RESTful API with validation' },
      { id: 4, title: 'Create UI components', status: 'pending', description: 'Build React components with proper state management' },
      { id: 5, title: 'Write unit tests', status: 'pending', description: 'Achieve 80%+ code coverage' },
      { id: 6, title: 'Integration testing', status: 'pending', description: 'Test end-to-end workflows' },
      { id: 7, title: 'Documentation', status: 'pending', description: 'Write API docs and user guides' }
    ]
  }

  const updateTaskStatus = (taskId, newStatus) => {
    if (!activeSpec) return
    
    const updatedTasks = activeSpec.tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    )
    
    const updatedSpec = { ...activeSpec, tasks: updatedTasks }
    setActiveSpec(updatedSpec)
    setSpecs(specs.map(s => s.id === activeSpec.id ? updatedSpec : s))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SpecFlow AI
              </h1>
              <p className="text-xs text-muted-foreground">Spec-Driven Development IDE</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Zap className="w-3 h-3 mr-1" />
              {mcpServers.filter(s => s.status === 'connected').length} MCP Servers
            </Badge>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Specs List */}
          <div className="col-span-3">
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Specifications
                </CardTitle>
                <CardDescription>Your spec-driven projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  {specs.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileCode className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No specs yet</p>
                      <p className="text-xs mt-1">Create one to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {specs.map(spec => (
                        <Card 
                          key={spec.id}
                          className={`cursor-pointer transition-all hover:bg-white/5 ${
                            activeSpec?.id === spec.id ? 'bg-white/10 border-purple-500/50' : 'bg-black/20 border-white/5'
                          }`}
                          onClick={() => setActiveSpec(spec)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-sm line-clamp-2">{spec.title}</h3>
                              <Badge 
                                variant="outline" 
                                className={`ml-2 text-xs ${
                                  spec.status === 'completed' ? 'border-green-500/50 text-green-400' :
                                  spec.status === 'in-progress' ? 'border-yellow-500/50 text-yellow-400' :
                                  'border-gray-500/50 text-gray-400'
                                }`}
                              >
                                {spec.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckSquare className="w-3 h-3" />
                              {spec.tasks.filter(t => t.status === 'completed').length}/{spec.tasks.length} tasks
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* MCP Servers */}
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Database className="w-4 h-4" />
                  MCP Servers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mcpServers.map(server => (
                  <div key={server.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{server.name}</span>
                      <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                        {server.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {server.tools.length} tools available
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            {!activeSpec ? (
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Create New Specification
                  </CardTitle>
                  <CardDescription>
                    Describe your feature or project, and AI will generate structured specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Example: Build a user authentication system with email/password login, JWT tokens, and password reset functionality..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[200px] bg-black/20 border-white/10 focus:border-purple-500/50 resize-none"
                  />
                  <Button 
                    onClick={generateSpec}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!prompt.trim()}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Specification
                  </Button>

                  <Separator className="bg-white/10" />

                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <Card className="bg-black/20 border-white/5">
                      <CardContent className="p-4 text-center">
                        <BookOpen className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                        <h3 className="font-semibold text-sm mb-1">Requirements</h3>
                        <p className="text-xs text-muted-foreground">EARS notation user stories</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/20 border-white/5">
                      <CardContent className="p-4 text-center">
                        <Layers className="w-8 h-8 mx-auto mb-2 text-pink-400" />
                        <h3 className="font-semibold text-sm mb-1">Design</h3>
                        <p className="text-xs text-muted-foreground">Architecture & data models</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/20 border-white/5">
                      <CardContent className="p-4 text-center">
                        <ListChecks className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                        <h3 className="font-semibold text-sm mb-1">Tasks</h3>
                        <p className="text-xs text-muted-foreground">Actionable implementation steps</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{activeSpec.title}</CardTitle>
                      <CardDescription>Spec-driven development workflow</CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveSpec(null)}
                      className="border-white/10"
                    >
                      New Spec
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="requirements" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-black/20">
                      <TabsTrigger value="requirements" className="data-[state=active]:bg-purple-600">
                        <FileText className="w-4 h-4 mr-2" />
                        Requirements
                      </TabsTrigger>
                      <TabsTrigger value="design" className="data-[state=active]:bg-pink-600">
                        <Layers className="w-4 h-4 mr-2" />
                        Design
                      </TabsTrigger>
                      <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-600">
                        <CheckSquare className="w-4 h-4 mr-2" />
                        Tasks
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="requirements" className="mt-6">
                      <ScrollArea className="h-[500px] rounded-lg bg-black/20 p-6 border border-white/5">
                        <div className="prose prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap text-sm font-mono text-gray-300">
                            {activeSpec.requirements}
                          </pre>
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="design" className="mt-6">
                      <ScrollArea className="h-[500px] rounded-lg bg-black/20 p-6 border border-white/5">
                        <div className="prose prose-invert max-w-none">
                          <pre className="whitespace-pre-wrap text-sm font-mono text-gray-300">
                            {activeSpec.design}
                          </pre>
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="tasks" className="mt-6">
                      <ScrollArea className="h-[500px]">
                        <div className="space-y-3">
                          {activeSpec.tasks.map(task => (
                            <Card 
                              key={task.id} 
                              className={`bg-black/20 border-white/5 transition-all ${
                                task.status === 'completed' ? 'opacity-60' : ''
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        Task {task.id}
                                      </Badge>
                                      <h3 className={`font-semibold ${
                                        task.status === 'completed' ? 'line-through text-muted-foreground' : ''
                                      }`}>
                                        {task.title}
                                      </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                  </div>
                                  <div className="flex gap-2 ml-4">
                                    {task.status === 'pending' && (
                                      <Button 
                                        size="sm" 
                                        onClick={() => updateTaskStatus(task.id, 'in-progress')}
                                        className="bg-yellow-600 hover:bg-yellow-700"
                                      >
                                        <Play className="w-3 h-3 mr-1" />
                                        Start
                                      </Button>
                                    )}
                                    {task.status === 'in-progress' && (
                                      <Button 
                                        size="sm" 
                                        onClick={() => updateTaskStatus(task.id, 'completed')}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckSquare className="w-3 h-3 mr-1" />
                                        Complete
                                      </Button>
                                    )}
                                    {task.status === 'completed' && (
                                      <Badge variant="outline" className="border-green-500/50 text-green-400">
                                        ✓ Done
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

