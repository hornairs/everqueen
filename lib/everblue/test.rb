require 'open3'

module Everblue
  class Test
    attr_reader :name, :suite

    def initialize(suite, name)
      @suite = suite
      @name = name
    end

    def root
      suite.root
    end

    def full_path
      File.join(root, Everblue.test_dir, name)
    end

    alias_method :asset_path, :name

    def url
      "#{suite.mounted_at}/run/#{name}"
    end

    def passed?
      runner.passed?
    end

    def failure_messages
      runner.failure_messages
    end

    def exist?
      File.exist?(full_path)
    end

  protected

    def runner
      @runner ||= suite.runner.test_runner(self)
    end
  end
end
